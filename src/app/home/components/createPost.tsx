import Image from 'next/image';
import { useEffect, useState } from 'react';

import { Alert, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMicrophone, faPause, faPlay, faStop, faTrash } from '@fortawesome/free-solid-svg-icons';
import { VoiceVisualizer, useVoiceVisualizer } from 'react-voice-visualizer-ap-v2';

import CreateInput from './createInput';

import { Account } from '@/app/login/models/login';

export default function CreatePost({
  userAccount,
  onPostCreateSubmit
}: {
  userAccount: Account,
  onPostCreateSubmit: (text: string, recordedBlob?: Blob) => void
}): React.ReactNode {
  const recorderControls = useVoiceVisualizer();
  const {
    recordedBlob,
    audioRef,
    startRecording,
    togglePauseResume,
    stopRecording,
    clearCanvas,
    isRecordingInProgress,
    isProcessingRecordedAudio,
    recordingTime,
    duration
  } = recorderControls;

  const [inputTextValue, setInputTextValue] = useState<string>('');
  const [hasRecordingStarted, setHasRecordingStarted] = useState<boolean>(false);
  const [isRecordingPaused, setIsRecordingPaused] = useState<boolean>(true);
  const [recordingTimeAmount, setRecordingTimeAmount] = useState<number>(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Callback function to update the input text value
  const handleInputChange = (text: string) => {
    setInputTextValue(text);
  };

  const handleCreatePost = (text: string, audioDuration: number, recordedBlob?: Blob | null) => {
    // Reset error message
    if(errorMessage) {
      setErrorMessage(null);
    }

    // If text is not provided, return error
    if (!text) {
      setErrorMessage('Text field is required to create a post.')
      return;
    };

    // If audio not provided, submit new post with text only
    if(!recordedBlob) {
      onPostCreateSubmit(text);
      setInputTextValue('');
      return;
    }

    // Round duration number
    const roundAudioDuration: number = Math.round(audioDuration);

    // Check if duration is more than 10 seconds
    if(roundAudioDuration > 10) {
      setErrorMessage('Audio duration must be less than 10 seconds.')
      return;
    }

    // If both text and audio are provided, submit new post
    onPostCreateSubmit(text, recordedBlob);

    // Reset input values and remove audio visualizer
    setInputTextValue('');
    clearCanvas();
  };

  useEffect(() => {
    setHasRecordingStarted(!isRecordingInProgress);
  }, [isRecordingInProgress]);

  useEffect(() => {
    setIsRecordingPaused(isProcessingRecordedAudio);
  }, [isProcessingRecordedAudio]);

  useEffect(() => {
    setRecordingTimeAmount(recordingTime);
  }, [recordingTime]);

  // Audio Controls Functions
  const handleStartRecording = () => {
    if(errorMessage) {
      setErrorMessage(null);
    }

    startRecording();
  };

  const handleAudioPlaybackPlay = (isRecordingPaused: boolean) => {
    if (isRecordingPaused) {
      togglePauseResume();
      setIsRecordingPaused(false);
    } else {
      handlePlayAudio();
      setIsRecordingPaused(true);
    }

    const durationMilliseconds: number = duration * 1000;

    // Take audio duration then set isRecordingPause back to false
    // so the play button icon changes to faPause
    setTimeout(() => {
      setIsRecordingPaused(false);
    }, durationMilliseconds);
  };

  const handleStopRecording = () => {
    stopRecording();
  };

  const handleClearCanvas = () => {
    if(errorMessage) {
      setErrorMessage(null);
    }

    clearCanvas();
  };

  const handlePlayAudio = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  return (
    <div className="home__main__feed__post card">
      <div className="card-body">
        {/* Status input section */}
        <div className='home__main__feed__post__status'>
          {/* Load user profile image */}
          <Image
            className='profile__image rounded-circle'
            height={48}
            width={48}
            src={userAccount?.picture}
            aria-label='User Profile Image'
            aria-labelledby='userProfileImg1'
            alt='User profile image'
          />

          {/* Input field */}
          <CreateInput value={inputTextValue} showSubmitButton={false} placeholder="What's happening" onSubmit={(text: string) => {
            handleInputChange(text);
          }}/>
        </div>

        {(!hasRecordingStarted || recordedBlob) && (
          <div className={`vizualizerSection ${ errorMessage ? 'vizualizerSection--invalid' : ''}`}>
            {recordedBlob && (
              <>
                {/* Pause recording button */}
                <Button
                  id='pauseRecordingButton'
                  variant='primary'
                  className='rounded-circle'
                  aria-label='Voice record button'
                  aria-labelledby='voiceRecordBtn1'
                  onClick={() => {
                    handleAudioPlaybackPlay(isRecordingPaused)
                  }}
                >
                  {isRecordingPaused ? (
                    <FontAwesomeIcon className='me-0' icon={faPause} />
                  ) : (
                    <FontAwesomeIcon className='me-0' icon={faPlay} />
                  )}
                </Button>
              </>
            )}

            {!hasRecordingStarted && (
              <div>
                {/* Stop recording button */}
                <Button
                  id='stopRecordingButton'
                  variant='danger'
                  className='rounded-circle me-1'
                  aria-label='Voice record button'
                  aria-labelledby='voiceRecordBtn1'
                  onClick={handleStopRecording}
                >
                  <FontAwesomeIcon className='me-0' icon={faStop} />
                </Button>
              </div>
            )}

            {/* Audio Player & Recorder */}
            <VoiceVisualizer
              gap={1}
              barWidth={2}
              speed={1}
              ref={audioRef}
              height={65}
              width={500}
              mainBarColor='#1717F4'
              isControlPanelShown={false}
              controls={recorderControls}
              rounded={1}
              useBeforeUnloadEvent={false}
            />

            {(isRecordingInProgress) && (
              <span className='vizualizerSection__time'>{(recordingTimeAmount / 1000).toFixed(2)}s</span>
            )}

            {recordedBlob && (
              <span className='vizualizerSection__time'>{duration.toFixed(2)}s</span>
            )}
          </div>
        )}

        {errorMessage && (
          <Alert className='vizualizerSection__errorMessage' variant='danger'>
            {errorMessage}
          </Alert>
        )}

        {/* Record action section */}
        <div className='home__main__feed__post__record'>
          {hasRecordingStarted && (
            <>
              {/* Start recording button */}
              <Button
                id='startRecordingButton'
                variant='link'
                className='rounded-circle me-1'
                aria-label='Voice record button'
                aria-labelledby='voiceRecordBtn1'
                onClick={handleStartRecording}
              >
                <FontAwesomeIcon className='record__icon' icon={faMicrophone} />
              </Button>
            </>
          )}

          <div className='home__main__feed__post__record__newPost'>
            { (!hasRecordingStarted || recordedBlob) && (
              <>
                {/* Clear canvas and stop recording / Delete recording */}
                <Button
                  id='clearRecordingButton'
                  variant='danger'
                  className='rounded-circle'
                  aria-label='Voice record button'
                  aria-labelledby='voiceRecordBtn1'
                  onClick={handleClearCanvas}
                >
                  <FontAwesomeIcon className='me-0' icon={faTrash} />
                </Button>
              </>
            )}

            <Button
              id='submitPostBtn'
              className='record__button'
              variant={inputTextValue ? 'primary' : 'secondary'}
              disabled={inputTextValue ? false : true}
              aria-label='Submit post button'
              aria-labelledby='submitPostBtn1'
              onClick={() => {
                handleCreatePost(inputTextValue, duration, recordedBlob)
              }}
            >
              New post
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
