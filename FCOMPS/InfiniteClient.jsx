"use client";
import React, { useEffect, useState, useRef } from "react";
import DataCardComponent from "@/FCOMPS/DataCardComponent";

export default function InfiniteScrollLoader({ totalPages, startPage }) {
  const [page, setPage] = useState(startPage);
  const [extraBrands, setExtraBrands] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(startPage < totalPages);
  const loaderRef = useRef(null);

  const fetchMore = async (nextPage) => {
    if (loading) return;
    setLoading(true);
    try {
      const url = `/api/brand-routes/f/get-all-brands-paginate/${nextPage}`;
      console.log(`Fetching from URL: ${url}`);
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch brands');
      }
      
      const res = await response.json();
      console.log(`Fetched page ${nextPage}, got ${res.data.length} brands, totalPages: ${res.totalPages}`);
      
      if (res.data && res.data.length > 0) {
        setExtraBrands((prev) => [...prev, ...res.data]);
      }
      
      // Update hasMore based on the response
      const hasMoreData = nextPage < res.totalPages;
      setHasMore(hasMoreData);
      
      if (!hasMoreData) {
        console.log('No more pages available');
      }
    } catch (err) {
      console.error("Error loading next page:", err);
      setHasMore(false); 
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting && hasMore && !loading) {
          console.log('Intersection detected, loading next page...');
          setPage((p) => p + 1);
        }
      },
      { threshold: 0.1, rootMargin: '100px' }
    );

    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [hasMore, loading]);

  useEffect(() => {
    if (page > startPage) fetchMore(page);
  }, [page]);

  return (
    <>
      {extraBrands.length > 0 && (
        <DataCardComponent
          title={false}
          cta_text={false}
          cta_url="/brands"
          slug="brand"
          data={JSON.stringify(extraBrands)}
          layout={3}
          heading={false}
        />
      )}

      {/* Loader */}
      <div ref={loaderRef} style={{ textAlign: "center", padding: "20px" }}>
        {loading && (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
            <div 
              style={{
                width: '20px',
                height: '20px',
                border: '2px solid #f3f3f3',
                borderTop: '2px solid #3498db',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite'
              }}
            />
            <span>Loading more brands...</span>
          </div>
        )}
        {!hasMore && !loading && <p>No more brands</p>}
        {hasMore && !loading && <p>Scroll down to load more brands</p>}
      </div>
      
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </>
  );
}
