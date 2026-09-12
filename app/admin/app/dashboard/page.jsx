"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Dashboard() {

  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(true);


  async function loadBusinesses() {

    const {
      data: { user }
    } = await supabase.auth.getUser();


    if (!user) {
      setLoading(false);
      return;
    }


    const { data, error } = await supabase
      .from("businesses")
      .select("*")
      .eq("owner_id", user.id);


    if (!error) {
      setBusinesses(data || []);
    }


    setLoading(false);
  }


  useEffect(() => {
    loadBusinesses();
  }, []);



  if (loading) {
    return <div className="p-6">
      Loading dashboard...
    </div>;
  }



  return (
    <main className="p-6">

      <h1 className="text-3xl font-bold mb-6">
        Business Owner Dashboard
      </h1>


      {businesses.length === 0 && (
        <p>
          You have no business listings yet.
        </p>
      )}



      <div className="grid gap-5">

        {businesses.map((business)=>(

          <div
            key={business.id}
            className="border rounded-xl p-5 shadow"
          >

            <h2 className="text-xl font-bold">
              {business.business_name}
            </h2>


            <p>
              Category: {business.category}
            </p>


            <p>
              Status:
              {" "}
              <span className="font-semibold">
                {business.status}
              </span>
            </p>


            <p>
              Subscription:
              {" "}
              {business.subscription_status || "Free"}
            </p>


            {business.is_featured && (
              <p>
                ⭐ Featured Business
              </p>
            )}


            <p className="mt-3">
              {business.description}
            </p>


          </div>

        ))}

      </div>

    </main>
  );
                    }
