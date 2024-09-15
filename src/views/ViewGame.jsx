import React, { useEffect } from "react";
import { Button } from "@nextui-org/react";
import { Howl } from "howler";

// Componentes
import Jokers from "../components/Jokers";
import Notification from "../components/Notification";
import GameMessage from "../components/GameMessage";
import PlaceCards from "../components/PlaceCards";
import MessageHeader from "../components/MessageHeader";

// Stores
import { useCardStore } from "../stores/useCardStore";
import { useGameStore } from "../stores/useGameStore";
import { useNotificationStore } from "../stores/useNotificationStore";

export default function ViewGame() {
  const { selectRandomCards, selectedCards } = useCardStore((state) => ({
    selectRandomCards: state.selectRandomCards,
    selectedCards: state.selectedCards,
  }));

  const {
    handleDiscardCards,
    handlePlayCards,
    discardAvailable,
    playAvailable,
    goolScore,
    handScore,
    handType,
    saveScore,
  } = useGameStore((state) => ({
    handleDiscardCards: state.handleDiscardCards,
    handlePlayCards: state.handlePlayCards,
    discardAvailable: state.discardAvailable,
    playAvailable: state.playAvailable,
    goolScore: state.goolScore,
    handScore: state.handScore,
    handType: state.handType,
    saveScore: state.saveScore,
  }));

  const { showModal, message, hideModal } = useNotificationStore((state) => ({
    showModal: state.showModal,
    message: state.message,
    hideModal: state.hideModal,
  }));

  useEffect(() => {
    selectRandomCards();
  }, [selectRandomCards]);

  useEffect(() => {
    handlePlayCards(1);
  }, [selectedCards]);

  useEffect(() => {
    if (playAvailable === 0 && goolScore > 0) {
      useNotificationStore.getState().showModalWithMessage("Perdido");
      saveScore(1);
    } else if (goolScore <= 0) {
      useNotificationStore.getState().showModalWithMessage("Ganado");
      saveScore(0);
    }
  }, [playAvailable, goolScore]);

  // Sound for activating and deactivating cards
  const activationSound = new Howl({
    src: ["/songs/Effect-Card-Start.mp3"],
    volume: 0.5,
  });

  return (
    <div className="flex flex-col items-center h-screen text-white gap-5">
      <Notification />
      <GameMessage isOpen={showModal} onClose={hideModal} message={message} />

      <div className="flex justify-around items-center w-full">
        <Jokers />
        <MessageHeader title={"Valor"} score={handScore} />
        <MessageHeader title={"Tipo"} score={handType} />
      </div>

      <div className="w-full text-danger font-bold text-xl text-center mt-5">
        <h1>{"Objetivo:"} {goolScore}</h1>
      </div>

      <div className="flex flex-wrap justify-around items-center w-full gap-6 mt-5">
        <Button
          className="rounded-full w-2/5 font-bold text-xl"
          color="danger"
          variant="ghost"
          onClick={() => {
            handleDiscardCards(0);
            activationSound.play();
          }}
        >
          {discardAvailable}
        </Button>

        <Button
          className="rounded-full w-2/5 font-bold text-xl"
          color="success"
          variant="ghost"
          onClick={() => {
            handlePlayCards(0);
            activationSound.play();
          }}
        >
          {playAvailable}
        </Button>

        <PlaceCards />
      </div>
    </div>
  );
}
