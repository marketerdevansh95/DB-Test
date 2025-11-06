"use client";
import Loader from "@/FCOMPS/Loader";
import EditIcon from "@/utils/EditIcon";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const MetaListWrapper = () => {
  const [loading, setLoading] = useState(true);
  const [meta, setMeta] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const request = await fetch(
        `${process.env.BASE_URL}/api/meta-routes/b/get-all-meta-data`,
        {cache: "no-cache" }
      );
      const response = await request.json();
      if (response.status != 200) {
        setMeta([]);
      } else {
        setMeta(response.data);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <div className="container wrapper">
      <div className="row">
        <div className="wrapper-top">
          <div>
            <h1>Meta Data</h1>
          </div>
        </div>
      </div>
      <div className="row">
        {loading ? (
          <Loader />
        ) : (
          meta.map((item) => {
            return (
              <div className="col-12" key={item._id}>
                <div className="brand-list">
                  <div>All Meta</div>
                  <div className="brand-actions">
                    <Link
                      prefetch={false}
                      href={`/admin/meta/${item._id}`}
                      passHref
                    >
                      <EditIcon />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default MetaListWrapper;
