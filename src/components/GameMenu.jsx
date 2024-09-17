import React from "react";
import ButtonMusic from "../components/ButtonMusic";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  AccordionItem,
  Accordion,
} from "@nextui-org/react";

import { HomeIcon, ArrowPathIcon } from "@heroicons/react/20/solid";
import { NavLink } from "react-router-dom";
import { Rules } from "../json/Rules";

import { useJokerStore } from "../stores/useJokerStore";
import { useGameStore } from "../stores/useGameStore";
import { useNotificationStore } from "../stores/useNotificationStore";

export default function GameMenu() {
  const { restartGame } = useGameStore((state) => ({
    restartGame: state.restartGame,
  }));

  const { restartJokers } = useJokerStore((state) => ({
    restartJokers: state.restartJokers,
  }));

  const { showModalMenu, hideModalGameMenu } = useNotificationStore((state) => ({
    hideModalGameMenu: state.hideModalGameMenu,
    showModalMenu: state.showModalMenu
  }));

  return (
    <Modal
      className="w-4/5"
      isOpen={showModalMenu}
      onOpenChange={hideModalGameMenu}
      placement="center"
    >
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">Menu</ModalHeader>

        <ModalBody>
          <div className="text-center flex flex-wrap justify-center gap-6">
            <NavLink to="/" className="w-3/12">
              <Button className="bg-custom-green-dark">
                <HomeIcon className="h-8 text-white" />
              </Button>
            </NavLink>

            <Button
              color="danger"
              className="w-3/12"
              onClick={() => {
                restartGame()
                restartJokers()
                hideModalGameMenu()
              }}
            >
              <ArrowPathIcon className="h-8 text-white" />
            </Button>

            <ButtonMusic />
          </div>

          <Accordion>
            <AccordionItem key="1" aria-label="Comodines" title="Comodines">
              Comodines
            </AccordionItem>
            <AccordionItem key="2" aria-label="Manos" title="Manos">
              <div className="flex flex-col gap-3">
                <h1 className="font-bold text-center text-custom-green-dark">
                  Juegos de manos reconocibles
                </h1>

                {Rules.map((rule, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <h1>
                      <span className="font-bold">{rule.title}: </span>
                      {rule.body}{" "}
                    </h1>
                  </div>
                ))}
              </div>
            </AccordionItem>
          </Accordion>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
