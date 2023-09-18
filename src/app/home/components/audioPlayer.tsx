"use client";

import React, { useEffect, useCallback } from 'react';
import { useVoiceVisualizer, VoiceVisualizer } from 'react-voice-visualizer-ap-v2';

const PostAudioPlayer = ({ audioUrl }: { audioUrl: string }) => {
  const recorderControls = useVoiceVisualizer();
  const { audioRef, setPreloadedAudioBlob } = recorderControls;

  const fetchAudioAndConvertToBlob = useCallback(async () => {
    if (audioUrl) {
      try {
        const response = await fetch(audioUrl);

        if (!response.ok) {
          throw new Error('Failed to fetch audio file');
        }

        const audioBlob = await response.blob();
        setPreloadedAudioBlob?.(audioBlob);
      } catch (error) {
        console.error('Error fetching or converting audio:', error);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetchAudioAndConvertToBlob();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='voiceVisualizer'>
      <VoiceVisualizer
        gap={1}
        isProgressIndicatorTimeShown={true}
        barWidth={2}
        ref={audioRef}
        height={65}
        width={550}
        mainBarColor='#1717F4'
        controls={recorderControls}
        rounded={1}
        useBeforeUnloadEvent={false}
      />
    </div>
  );
};

export default PostAudioPlayer;
