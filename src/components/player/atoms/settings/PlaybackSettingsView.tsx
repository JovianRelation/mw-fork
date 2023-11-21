import classNames from "classnames";
import { useCallback } from "react";

import { Menu } from "@/components/player/internals/ContextMenu";
import { useOverlayRouter } from "@/hooks/useOverlayRouter";
import { usePlayerStore } from "@/stores/player/store";

function ButtonList(props: {
  options: number[];
  selected: number;
  onClick: (v: any) => void;
}) {
  return (
    <div className="flex items-center bg-video-context-buttons-list p-1 rounded-lg">
      {props.options.map((option) => {
        return (
          <button
            type="button"
            className={classNames(
              "w-full px-2 py-1 rounded-md tabbable",
              props.selected === option
                ? "bg-video-context-buttons-active text-white"
                : null
            )}
            onClick={() => props.onClick(option)}
            key={option}
          >
            {option}x
          </button>
        );
      })}
    </div>
  );
}

export function PlaybackSettingsView({ id }: { id: string }) {
  const router = useOverlayRouter(id);
  const playbackRate = usePlayerStore((s) => s.mediaPlaying.playbackRate);
  const display = usePlayerStore((s) => s.display);

  const setPlaybackRate = useCallback(
    (v: number) => {
      display?.setPlaybackRate(v);
    },
    [display]
  );

  const options = [0.25, 0.5, 1, 1.25, 2];

  return (
    <>
      <Menu.BackLink onClick={() => router.navigate("/")}>
        Playback settings
      </Menu.BackLink>
      <Menu.Section>
        <div className="space-y-4 mt-3">
          <Menu.FieldTitle>Playback speed</Menu.FieldTitle>
          <ButtonList
            options={options}
            selected={playbackRate}
            onClick={setPlaybackRate}
          />
        </div>
      </Menu.Section>
    </>
  );
}
