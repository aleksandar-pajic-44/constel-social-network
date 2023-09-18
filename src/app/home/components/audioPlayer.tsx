"use client";

import React, { useEffect, useCallback } from 'react';
import { useVoiceVisualizer, VoiceVisualizer } from 'react-voice-visualizer-ap-v2';

const PostAudioPlayer = ({ audioUrl }: { audioUrl: string }) => {
  const recorderControls = useVoiceVisualizer();
  const { audioRef, setPreloadedAudioBlob, isCleared } = recorderControls;

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
  }, []);

  useEffect(() => {
    fetchAudioAndConvertToBlob();
  }, []);

  return (
    <div className='voiceVisualizer'>
      <VoiceVisualizer
      gap={1}
      isProgressIndicatorTimeShown={true}
      barWidth={2}
      ref={audioRef}
      height={65}
      width={475}
      mainBarColor='#1717F4'
      controls={recorderControls}
      rounded={1}
      useBeforeUnloadEvent={false}
    />
    </div>
  );
};

export default PostAudioPlayer;
