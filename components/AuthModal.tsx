"use client";

import Modal from "./Modal";
import { useRouter } from "next/navigation";
import { Auth } from "@supabase/auth-ui-react";
import {
  useSessionContext,
  useSupabaseClient,
} from "@supabase/auth-helpers-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import UseAuthModal from "@/hooks/UseAuthModal";
import { useEffect } from "react";

const AuthModal = () => {
  const router = useRouter();
  const { session } = useSessionContext();
  const { onClose, isOpen } = UseAuthModal();
  const supabaseClient = useSupabaseClient();

  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  useEffect(() => {
    if (session) {
      router.refresh();
      onClose();
    }
  }, [session, router, onClose]);

  return (
    <div>
      <Modal
        isOpen={isOpen}
        onChange={onChange}
        title="welcome back"
        description="login to your account"
      >
        <Auth
          magicLink
          theme="dark"
          providers={["github"]}
          supabaseClient={supabaseClient}
          appearance={{
            theme: ThemeSupa,
            variables: {
              default: {
                colors: {
                  brand: "#3D5AF1",
                  inputText: "#E2F3F5",
                  brandAccent: "#22D1EE",
                },
              },
            },
          }}
        />
      </Modal>
    </div>
  );
};

export default AuthModal;
