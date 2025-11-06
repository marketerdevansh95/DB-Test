"use client";
import React, { useState } from "react";
import { toast } from "react-toastify";

const CacheManager = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleRevalidateAll = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/revalidate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          secret: process.env.NEXT_PUBLIC_REVALIDATION_SECRET || "your-secret-key",
        }),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success("Cache cleared successfully! Changes should be visible now.", {
          theme: "colored",
        });
      } else {
        toast.error(`Failed to clear cache: ${result.message}`, {
          theme: "colored",
        });
      }
    } catch (error) {
      toast.error("Error clearing cache. Please try again.", {
        theme: "colored",
      });
      console.error("Cache revalidation error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRevalidateSpecific = async (path) => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/revalidate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          path,
          secret: process.env.NEXT_PUBLIC_REVALIDATION_SECRET || "your-secret-key",
        }),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success(`Cache cleared for ${path}!`, {
          theme: "colored",
        });
      } else {
        toast.error(`Failed to clear cache: ${result.message}`, {
          theme: "colored",
        });
      }
    } catch (error) {
      toast.error("Error clearing cache. Please try again.", {
        theme: "colored",
      });
      console.error("Cache revalidation error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="cache-manager-wrapper">
      <div className="cache-manager-section">
        <h3>Cache Management</h3>
        <p className="cache-description">
          Use these buttons to clear the website cache and make your changes visible immediately.
        </p>
        
        <div className="cache-buttons">
          <button
            onClick={handleRevalidateAll}
            disabled={isLoading}
            className="btn btn-primary cache-btn"
          >
            {isLoading ? "Clearing..." : "Clear All Cache"}
          </button>
          
          <button
            onClick={() => handleRevalidateSpecific("/")}
            disabled={isLoading}
            className="btn btn-secondary cache-btn"
          >
            Clear Home Page
          </button>
          
          <button
            onClick={() => handleRevalidateSpecific("/brands/[pageNo]")}
            disabled={isLoading}
            className="btn btn-secondary cache-btn"
          >
            Clear Brand Listings
          </button>
        </div>
        
        <div className="cache-info">
          <small>
            <strong>Note:</strong> After adding or updating brands, blogs, or categories, 
            click "Clear All Cache" to make changes visible on the live website immediately.
          </small>
        </div>
      </div>
      
      <style jsx>{`
        .cache-manager-wrapper {
          background: #f8f9fa;
          border: 1px solid #dee2e6;
          border-radius: 8px;
          padding: 20px;
          margin: 20px 0;
        }
        
        .cache-manager-section h3 {
          color: #495057;
          margin-bottom: 10px;
        }
        
        .cache-description {
          color: #6c757d;
          margin-bottom: 15px;
          font-size: 14px;
        }
        
        .cache-buttons {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
          margin-bottom: 15px;
        }
        
        .cache-btn {
          min-width: 150px;
          padding: 8px 16px;
          font-size: 14px;
        }
        
        .cache-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
        
        .cache-info {
          background: #e7f3ff;
          border: 1px solid #b3d4fc;
          border-radius: 4px;
          padding: 10px;
          color: #004085;
        }
        
        .cache-info strong {
          color: #002752;
        }
      `}</style>
    </div>
  );
};

export default CacheManager;
