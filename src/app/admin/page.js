"use client";
import React, { useEffect, useState } from "react";
import { finishDispute, getContract, setName, setImage } from "@/services/Web3Service";
import { useRouter } from "next/navigation";

export default function Admin() {
  const { push } = useRouter();
  const [winner, setWinner] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isOwner, setIsOwner] = useState(false);
  const [candidate1Name, setCandidate1Name] = useState("");
  const [candidate2Name, setCandidate2Name] = useState("");
  const [candidate1Image, setCandidate1Image] = useState("");
  const [candidate2Image, setCandidate2Image] = useState("");

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
          push("/"); // Redireciona se não for owner
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

  const handleUpdateName = async (candidate, name) => {
    if (!name) {
      setMessage("Por favor, insira um nome válido.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      await setName(candidate, name);
      setMessage("Nome do candidato atualizado com sucesso!");
    } catch (error) {
      setMessage("Erro ao atualizar o nome: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateImage = async (candidate, image) => {
    if (!image) {
      setMessage("Por favor, insira uma URL de imagem válida.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      await setImage(candidate, image);
      setMessage("Imagem do candidato atualizada com sucesso!");
    } catch (error) {
      setMessage("Erro ao atualizar a imagem: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Carregando...</p>;

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

            <h3 className="mt-5">Atualizar Informações dos Candidatos</h3>

            <div className="form-group">
              <label htmlFor="candidate1Name">Nome do Candidato 1:</label>
              <input
                type="text"
                className="form-control"
                id="candidate1Name"
                value={candidate1Name}
                onChange={(e) => setCandidate1Name(e.target.value)}
                placeholder="Nome do Candidato 1"
              />
              <button
                className="btn btn-secondary mt-2"
                onClick={() => handleUpdateName(1, candidate1Name)}
              >
                Atualizar Nome do Candidato 1
              </button>
            </div>

            <div className="form-group mt-3">
              <label htmlFor="candidate2Name">Nome do Candidato 2:</label>
              <input
                type="text"
                className="form-control"
                id="candidate2Name"
                value={candidate2Name}
                onChange={(e) => setCandidate2Name(e.target.value)}
                placeholder="Nome do Candidato 2"
              />
              <button
                className="btn btn-secondary mt-2"
                onClick={() => handleUpdateName(2, candidate2Name)}
              >
                Atualizar Nome do Candidato 2
              </button>
            </div>

            <div className="form-group mt-3">
              <label htmlFor="candidate1Image">Imagem do Candidato 1 (URL):</label>
              <input
                type="text"
                className="form-control"
                id="candidate1Image"
                value={candidate1Image}
                onChange={(e) => setCandidate1Image(e.target.value)}
                placeholder="URL da Imagem do Candidato 1"
              />
              <button
                className="btn btn-secondary mt-2"
                onClick={() => handleUpdateImage(1, candidate1Image)}
              >
                Atualizar Imagem do Candidato 1
              </button>
            </div>

            <div className="form-group mt-3">
              <label htmlFor="candidate2Image">Imagem do Candidato 2 (URL):</label>
              <input
                type="text"
                className="form-control"
                id="candidate2Image"
                value={candidate2Image}
                onChange={(e) => setCandidate2Image(e.target.value)}
                placeholder="URL da Imagem do Candidato 2"
              />
              <button
                className="btn btn-secondary mt-2"
                onClick={() => handleUpdateImage(2, candidate2Image)}
              >
                Atualizar Imagem do Candidato 2
              </button>
            </div>

            {message && <p className="mt-3">{message}</p>}
          </div>
        </main>
      </div>
    </>
  );
}
