import * as React from "react";

interface Props {
  code: string;
}

export const VerificationCodeTemplate: React.FC<Props> = ({ code }) => (
  <div>
    <p>Ваш код - {code}</p>

    <a href={`http://localhost:3000/api/auth/veryfiy?code=${code}`}>Подтвердить регистрацию</a>
  </div>
);
