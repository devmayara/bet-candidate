"use client";
import React, { useEffect, useState } from "react";
import { finishDispute, getContract } from "@/services/Web3Service";
import { useRouter } from "next/navigation";

export default function Admin() {
  const { push } = useRouter();
  const [winner, setWinner] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    const checkOwner = async () => {
      try {
        const contract = getContract();
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        const userAddress = accounts[0];
        const ownerAddress = await contract.methods.getOwner().call();

        if (userAddress.toLowerCase() === ownerAddress.toLowerCase()) {
          setIsOwner(true);
        } else {
          setIsOwner(false);
        }
      } catch (error) {
        console.error("Erro ao verificar o proprietário:", error);
      } finally {
        setLoading(false);
      }
    };

    checkOwner();
  }, []);

  const handleFinishDispute = async () => {
    if (!winner) {
      setMessage("Por favor, selecione um vencedor.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      await finishDispute(winner);
      setMessage("Disputa finalizada com sucesso!");
    } catch (error) {
      setMessage("Erro ao finalizar a disputa: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Carregando...</p>;
  if (!isOwner)  return push("/");

  return (
    <>
      <div className="d-flex flex-column min-vh-100">
        <main className="container px-4 py-5 flex-grow-1">
          <div className="row align-items-center">
            <h1 className="display-5 fw-bold text-body-emphasis lh-1 mb-3">
              Admin Page
            </h1>
            <h3>Finalizar Disputa</h3>

            <div className="form-group">
              <label htmlFor="winner">Selecione o vencedor:</label>
              <input
                type="text"
                className="form-control"
                id="winner"
                value={winner}
                onChange={(e) => setWinner(e.target.value)}
                placeholder="ID do vencedor"
              />
            </div>

            <button
              className="btn btn-primary mt-3"
              onClick={handleFinishDispute}
              disabled={loading}
            >
              {loading ? "Finalizando..." : "Finalizar Disputa"}
            </button>

            {message && <p className="mt-3">{message}</p>}
          </div>
        </main>
      </div>
    </>
  );
}
