"use client";
import { useState } from "react";
import { Accordion } from "react-bootstrap";

export default function About() {
  const [openIndex, setOpenIndex] = useState("1");

  const toggleOpen = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      <div className="d-flex flex-column">
        <main className="container px-4 py-5 flex-grow-1">
          <div className="row align-items-center">
            <h1 className="display-5 fw-bold text-body-emphasis lh-1 mb-3">
              About Page
            </h1>

            <p className="lead">
              <b>BetCandidate</b> é uma plataforma de apostas on-chain nas
              eleições americanas. Participe das disputas e coloque sua aposta
              no candidato que você acredita que irá vencer.
            </p>
            <h2 className="mt-4">Regras da Disputa</h2>
            <p className="lead mb-5">
              A plataforma opera com base em contratos inteligentes escritos em
              Solidity, que garantem a execução automática e segura de todas as
              operações. Aqui está um resumo das principais regras:
            </p>

            <Accordion defaultActiveKey="1">
              <Accordion.Item eventKey="1">
                <Accordion.Header>
                  <strong>Aposta</strong> 
                </Accordion.Header>
                <Accordion.Body>
                  <b>Apostar em candidatos: </b>
                  Você pode apostar em um dos dois candidatos disponíveis até o dia
                  4 de novembro de 2024. Para fazer isso, basta selecionar o
                  candidato desejado e realizar uma transação com uma quantia de
                  criptomoeda POL.
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="2">
                <Accordion.Header>
                  <strong>Escolha do Vencedor</strong> 
                </Accordion.Header>
                <Accordion.Body>
                  <b>Determinação do vencedor: </b>
                  Após o término das eleições e uma janela de tempo adicional (até 12
                  de novembro de 2024), o vencedor será anunciado. O contrato
                  determinará automaticamente o candidato vencedor com base nos
                  resultados oficiais.
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="3">
                <Accordion.Header>
                  <strong>Distribuição de Prêmios</strong> 
                </Accordion.Header>
                <Accordion.Body>
                  <b>Como os prêmios são distribuídos: </b>
                  O prêmio total será composto pela soma das apostas feitas em ambos
                  os candidatos, subtraída de uma comissão de 10% (para cobrir as
                  taxas operacionais da plataforma). O restante será distribuído
                  entre os apostadores que acertaram o candidato vencedor,
                  proporcionalmente ao valor apostado.
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="4">
                <Accordion.Header>
                  <strong>Regras de Retirada</strong> 
                </Accordion.Header>
                <Accordion.Body>
                  <b>Como resgatar seu prêmio: </b>
                  Se você apostou no candidato vencedor, poderá resgatar seu prêmio
                  após o anúncio oficial do resultado. O valor do prêmio dependerá
                  do quanto você apostou e da proporção em relação ao total
                  apostado no candidato vencedor.
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="5">
                <Accordion.Header>
                  <strong>Segurança das Apostas</strong> 
                </Accordion.Header>
                <Accordion.Body>
                  <b>Protegendo suas apostas: </b>
                  As apostas não podem ser alteradas ou retiradas após serem feitas,
                  e o contrato inteligente impede apostas duplicadas por um mesmo
                  usuário.
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="6">
                <Accordion.Header>
                  <strong>Importante</strong> 
                </Accordion.Header>
                <Accordion.Body>
                  Certifique-se de que entende todos os termos antes de participar. 
                  Ao fazer uma aposta, você concorda com todas as regras estabelecidas.
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>

            <p className="message mt-5">
              Participe agora e aposte no seu candidato favorito para as
              eleições americanas de 2024! Todas as transações são públicas e
              imutáveis, garantindo que o processo seja justo e transparente
              para todos os participantes.
            </p>
          </div>
        </main>
      </div>
    </>
  );
}
