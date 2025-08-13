'use client';

import { useState, useEffect, useRef } from 'react';

interface VoiceNote {
  id: string;
  date: string;
  duration: number;
  emotion: string;
  blob?: Blob;
  url?: string;
  title: string;
}

export default function VoicePage() {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [voiceNotes, setVoiceNotes] = useState<VoiceNote[]>([]);
  const [selectedEmotion, setSelectedEmotion] = useState('');
  const [currentlyPlaying, setCurrentlyPlaying] = useState<string | null>(null);
  const [showEmotionModal, setShowEmotionModal] = useState(false);
  const [currentRecording, setCurrentRecording] = useState<Blob | null>(null);

  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const audioChunks = useRef<Blob[]>([]);
  const recordingInterval = useRef<NodeJS.Timeout | null>(null);

  const emotions = [
    { id: 'grateful', label: 'Grateful', emoji: '🙏', color: '#10B981' },
    { id: 'happy', label: 'Happy', emoji: '😊', color: '#F59E0B' },
    { id: 'peaceful', label: 'Peaceful', emoji: '😌', color: '#8B5CF6' },
    { id: 'anxious', label: 'Anxious', emoji: '😰', color: '#EF4444' },
    { id: 'sad', label: 'Sad', emoji: '😢', color: '#6B7280' },
    { id: 'excited', label: 'Excited', emoji: '🤩', color: '#EC4899' },
    { id: 'frustrated', label: 'Frustrated', emoji: '😤', color: '#F97316' },
    { id: 'hopeful', label: 'Hopeful', emoji: '🌟', color: '#06B6D4' },
  ];

  useEffect(() => {
    const savedNotes = localStorage.getItem('voiceNotes');
    if (savedNotes) {
      const notes = JSON.parse(savedNotes);
      setVoiceNotes(notes);
    }
  }, []);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorder.current = new MediaRecorder(stream);
      audioChunks.current = [];

      mediaRecorder.current.ondataavailable = (event) => {
        audioChunks.current.push(event.data);
      };

      mediaRecorder.current.onstop = () => {
        const audioBlob = new Blob(audioChunks.current, { type: 'audio/wav' });
        setCurrentRecording(audioBlob);
        setShowEmotionModal(true);
      };

      mediaRecorder.current.start();
      setIsRecording(true);
      setRecordingTime(0);

      recordingInterval.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    } catch (error) {
      console.error('Error accessing microphone:', error);
      alert('Unable to access microphone. Please check your permissions.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorder.current && isRecording) {
      mediaRecorder.current.stop();
      mediaRecorder.current.stream.getTracks().forEach(track => track.stop());
      setIsRecording(false);
      if (recordingInterval.current) {
        clearInterval(recordingInterval.current);
      }
    }
  };

  const saveRecording = (emotion: string) => {
    if (!currentRecording) return;

    const newNote: VoiceNote = {
      id: Date.now().toString(),
      date: new Date().toLocaleString(),
      duration: recordingTime,
      emotion,
      title: `Voice note - ${new Date().toLocaleDateString()}`,
      url: URL.createObjectURL(currentRecording)
    };

    const updatedNotes = [newNote, ...voiceNotes];
    setVoiceNotes(updatedNotes);
    
    // Save to localStorage (without the blob/url for storage efficiency)
    const notesToSave = updatedNotes.map(note => ({
      ...note,
      blob: undefined,
      url: undefined
    }));
    localStorage.setItem('voiceNotes', JSON.stringify(notesToSave));

    setCurrentRecording(null);
    setShowEmotionModal(false);
    setRecordingTime(0);
  };

  const playRecording = (noteId: string, url?: string) => {
    if (currentlyPlaying === noteId) {
      setCurrentlyPlaying(null);
      return;
    }

    if (url) {
      const audio = new Audio(url);
      audio.play();
      setCurrentlyPlaying(noteId);
      
      audio.onended = () => {
        setCurrentlyPlaying(null);
      };
    }
  };

  const deleteRecording = (noteId: string) => {
    const updatedNotes = voiceNotes.filter(note => note.id !== noteId);
    setVoiceNotes(updatedNotes);
    localStorage.setItem('voiceNotes', JSON.stringify(updatedNotes));
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getEmotionDetails = (emotionId: string) => {
    return emotions.find(e => e.id === emotionId) || emotions[0];
  };

  return (
    <div className="min-vh-100 bg-light">
      {/* Header */}
      <div 
        className="text-white py-4"
        style={{ background: 'linear-gradient(135deg, #A855F7 0%, #EC4899 100%)' }}
      >
        <div className="container">
          <h1 className="h3 fw-bold mb-1">HerVoice Journal</h1>
          <p className="mb-0 opacity-90">Ukubhala ngezwi - Your private space</p>
        </div>
      </div>

      <div className="container py-4">
        {/* Recording Section */}
        <div className="card border-0 rounded-4 mb-4">
          <div className="card-body p-4 text-center">
            <h5 className="fw-bold mb-3">Record Your Thoughts</h5>
            
            <div 
              className={`rounded-circle mx-auto mb-4 d-flex align-items-center justify-content-center ${isRecording ? 'pulse-btn' : ''}`}
              style={{ 
                width: '120px', 
                height: '120px', 
                background: isRecording 
                  ? 'linear-gradient(135deg, #EF4444 0%, #F87171 100%)' 
                  : 'linear-gradient(135deg, #A855F7 0%, #EC4899 100%)',
                color: 'white',
                cursor: 'pointer'
              }}
              onClick={isRecording ? stopRecording : startRecording}
            >
              <div className="text-center">
                <div className="w-12 h-12 d-flex align-items-center justify-content-center mb-1">
                  <i className={`${isRecording ? 'ri-stop-circle-fill' : 'ri-mic-fill'} fs-1`}></i>
                </div>
                {isRecording && (
                  <div className="small fw-semibold">
                    {formatTime(recordingTime)}
                  </div>
                )}
              </div>
            </div>

            <p className="mb-3 text-muted">
              {isRecording 
                ? "Recording... Tap to stop and save your voice note"
                : "Tap the microphone to start recording your thoughts"
              }
            </p>

            {!isRecording && voiceNotes.length === 0 && (
              <div className="alert alert-info rounded-3">
                <small>
                  <strong>Privacy First:</strong> All your voice notes are stored locally on your device. 
                  No one else can access them.
                </small>
              </div>
            )}
          </div>
        </div>

        {/* Voice Notes List */}
        {voiceNotes.length > 0 && (
          <div className="card border-0 rounded-4">
            <div className="card-body p-4">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="fw-bold mb-0">Your Voice Notes</h5>
                <span className="badge bg-secondary rounded-pill">
                  {voiceNotes.length} recording{voiceNotes.length !== 1 ? 's' : ''}
                </span>
              </div>

              <div className="row g-3">
                {voiceNotes.map((note) => {
                  const emotion = getEmotionDetails(note.emotion);
                  return (
                    <div key={note.id} className="col-12">
                      <div className="card border rounded-3">
                        <div className="card-body p-3">
                          <div className="d-flex justify-content-between align-items-start mb-2">
                            <div className="flex-grow-1">
                              <div className="d-flex align-items-center mb-1">
                                <span 
                                  className="badge rounded-pill me-2 px-2 py-1"
                                  style={{ backgroundColor: emotion.color, color: 'white' }}
                                >
                                  {emotion.emoji} {emotion.label}
                                </span>
                                <small className="text-muted">{formatTime(note.duration)}</small>
                              </div>
                              <h6 className="mb-1">{note.title}</h6>
                              <small className="text-muted">{note.date}</small>
                            </div>
                            <button
                              onClick={() => deleteRecording(note.id)}
                              className="btn btn-outline-danger btn-sm rounded-circle p-2"
                              style={{ width: '32px', height: '32px' }}
                            >
                              <div className="w-3 h-3 d-flex align-items-center justify-content-center">
                                <i className="ri-delete-bin-line small"></i>
                              </div>
                            </button>
                          </div>

                          <div className="d-flex align-items-center">
                            <button
                              onClick={() => playRecording(note.id, note.url)}
                              className="btn btn-sm rounded-pill me-2 text-white text-decoration-none whitespace-nowrap"
                              style={{ background: 'linear-gradient(135deg, #A855F7 0%, #EC4899 100%)' }}
                            >
                              <div className="w-4 h-4 d-flex align-items-center justify-content-center me-1">
                                <i className={`${currentlyPlaying === note.id ? 'ri-pause-line' : 'ri-play-line'}`}></i>
                              </div>
                              {currentlyPlaying === note.id ? 'Playing...' : 'Play'}
                            </button>
                            
                            {!note.url && (
                              <small className="text-muted">
                                <i className="ri-information-line me-1"></i>
                                Recording expired
                              </small>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Emotion Selection Modal */}
      {showEmotionModal && (
        <div className="modal d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 rounded-4">
              <div className="modal-body p-4">
                <h5 className="fw-bold mb-3 text-center">How are you feeling?</h5>
                <p className="text-muted text-center mb-4">
                  Tag your voice note with an emotion to help organize your thoughts
                </p>
                
                <div className="row g-2">
                  {emotions.map((emotion) => (
                    <div key={emotion.id} className="col-6 col-md-4">
                      <button
                        onClick={() => saveRecording(emotion.id)}
                        className="btn w-100 p-3 rounded-3 border text-decoration-none whitespace-nowrap"
                        style={{ 
                          borderColor: emotion.color,
                          color: emotion.color
                        }}
                      >
                        <div className="text-center">
                          <div className="fs-4 mb-1">{emotion.emoji}</div>
                          <small className="fw-semibold">{emotion.label}</small>
                        </div>
                      </button>
                    </div>
                  ))}
                </div>

                <div className="text-center mt-4">
                  <button
                    onClick={() => {
                      setShowEmotionModal(false);
                      setCurrentRecording(null);
                    }}
                    className="btn btn-outline-secondary rounded-pill text-decoration-none whitespace-nowrap"
                  >
                    Cancel Recording
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}