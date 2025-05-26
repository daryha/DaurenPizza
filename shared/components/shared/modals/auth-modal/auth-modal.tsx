import { Button, Dialog, DialogContent } from "@/shared/components/ui";
import { signIn } from "next-auth/react";
import React from "react";
import { LoginForm } from "./forms/login-form";
import { register } from "module";
import { RegisterForm } from "./forms/registrer-form";

interface Props {
  open: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<Props> = ({ open, onClose }) => {
  const [type, setType] = React.useState<"login" | "register">("login");

  const onSwitchType = () => {
    setType(type === "login" ? "register" : "login");
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="w-[450px] bg-white p-10">
        {type === "login" ? (
          <LoginForm onClose={handleClose} />
        ) : (
          <RegisterForm onClose={handleClose} />
        )}
        <hr />
        <div className="flex gap-2">
          <Button
            variant={"secondary"}
            onClick={() =>
              signIn("github", {
                callbackUrl: "/",
                redirect: true,
              })
            }
            type="button"
            className="gap-2 h-12 p-2 flex-1 "
          >
            <img
              src="https://img.icons8.com/?size=100&id=62856&format=png&color=000000"
              className="w-[40px] "
              alt="gitLogo"
            />
            GitHub
          </Button>

          <Button
            variant={"secondary"}
            onClick={() =>
              signIn("google", {
                callbackUrl: "/",
                redirect: true,
              })
            }
            type="button"
            className="gap-2 h-12 p-2 flex-1"
          >
            <img
              src="https://img.icons8.com/?size=100&id=17949&format=png&color=000000"
              className="w-[40px] "
              alt="googleLogo"
            />
            Google
          </Button>
        </div>
        <Button variant={"outline"} onClick={onSwitchType} type="button" className="h-12">
          {type === "login" ? "register" : "login"}
        </Button>
      </DialogContent>
    </Dialog>
  );
};
