"use client";
import { doLogin } from "@/services/Web3Service";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const [message, setMessage] = useState();
  const { push } = useRouter();

  function btnLoginClick() {
    setMessage("Conectando na carteira, aguarde...");
    doLogin()
      .then((account) => push("/bet"))
      .catch((error) => {
        console.log(error);
        setMessage(error.message);
      });
  }

  return (
    <>
      <div className="d-flex flex-column">
        <main className="container px-4 py-5 flex-grow-1">
          <div className="row align-items-center g-5 py-5">
            <div className="col-md-6 text-center text-md-start">
              <h1 className="display-5 fw-bold text-body-emphasis lh-1 mb-3">
                BetCandidate
              </h1>
              <p className="lead">
                <b>Apostas on-chain nas eleições americanas.</b>
              </p>
              <p className="lead">
                Autentique-se com sua carteira e deixe a sua aposta para a
                próxima disputa.
              </p>
              <div className="d-flex justify-content-center justify-content-md-start">
                <button
                  type="button"
                  className="btn btn-primary btn-lg px-4 d-flex align-items-center"
                  onClick={btnLoginClick}
                >
                  <img src="/metamask.svg" className="me-3" width={32} />
                  Conectar MetaMask
                </button>
              </div>
              <p className="message">{message}</p>
            </div>

            <div className="col-md-6 d-flex justify-content-center">
              <img
                src="/D.K.png"
                className="img-fluid rounded-4 shadow-lg"
                alt="Logo BetCandidate"
                style={{ maxWidth: "100%", height: "auto" }}
                loading="lazy"
              />
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
