"use client";

import { useState } from "react";
import { Database } from "@/types_db";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

interface SupabaseProvidersProps {
  children: React.ReactNode;
}

const SupabaseProviders: React.FC<SupabaseProvidersProps> = ({ children }) => {
  const [supabaseClient] = useState(() =>
    createClientComponentClient<Database>()
  );

  return (
    <SessionContextProvider supabaseClient={supabaseClient}>
      {children}
    </SessionContextProvider>
  );
};

export default SupabaseProviders;
