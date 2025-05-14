
import React, { useState } from 'react';
import { useCoupleContext } from '../context/CoupleContext';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';

const RoadOfPeace: React.FC = () => {
  const {
    currentProfile,
    partnerProfile,
    roadOfPeaceActive,
    currentTurn,
    messages,
    maxSteps,
    currentStep,
    addMessage,
    endRoadOfPeace,
  } = useCoupleContext();

  const [messageText, setMessageText] = useState('');
  const [showApologyDialog, setShowApologyDialog] = useState(false);
  const [apologyReason, setApologyReason] = useState('');
  const [showAgreementDialog, setShowAgreementDialog] = useState(false);
  
  if (!currentProfile || !partnerProfile || !roadOfPeaceActive) return null;

  const isMyTurn = currentProfile.id === currentTurn;
  const progress = Math.round((currentStep / maxSteps) * 100);
  
  const handleSendMessage = () => {
    if (messageText.trim() && isMyTurn) {
      addMessage(messageText.trim());
      setMessageText('');
    }
  };

  const handleApologize = () => {
    setShowApologyDialog(true);
  };

  const submitApology = () => {
    if (apologyReason.trim() && isMyTurn) {
      addMessage(messageText.trim() || "I apologize.", true, apologyReason);
      setMessageText('');
      setApologyReason('');
      setShowApologyDialog(false);
    }
  };

  const handleReachAgreement = () => {
    setShowAgreementDialog(true);
  };

  const confirmAgreement = () => {
    endRoadOfPeace(true);
    setShowAgreementDialog(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4">
      <div className="max-w-lg mx-auto">
        <div className="ios-card mb-4">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl font-semibold">Road of Peace</h2>
            <div className="flex items-center text-sm">
              <span>Step {currentStep}/{maxSteps}</span>
            </div>
          </div>
          
          <Progress value={progress} className="h-2 mb-6" />
          
          <div className="flex justify-center mb-6">
            <div className="flex items-center w-full">
              <div className="text-center flex-shrink-0">
                <div className="text-2xl mb-1">{currentProfile.avatar}</div>
                <div className="text-sm font-medium">{currentProfile.name}</div>
              </div>
              
              <div className="grow mx-2 h-0.5 bg-gradient-to-r from-blue-200 via-purple-200 to-blue-200"></div>
              
              <div className="text-center flex-shrink-0">
                <div className="text-2xl mb-1">{partnerProfile.avatar}</div>
                <div className="text-sm font-medium">{partnerProfile.name}</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 mb-6 max-h-72 overflow-auto border border-gray-100">
            {messages.length === 0 ? (
              <div className="text-center text-muted-foreground py-8">
                <p>Your journey of resolution begins here.</p>
                <p className="mt-2 text-sm">
                  {
                    currentProfile.id === currentTurn ? 
                    "It's your turn to express your feelings." : 
                    `Waiting for ${partnerProfile.name} to speak.`
                  }
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {messages.map((message) => {
                  const isCurrentUser = message.profileId === currentProfile.id;
                  const profile = isCurrentUser ? currentProfile : partnerProfile;
                  
                  return (
                    <div key={message.id} className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[80%] ${
                        isCurrentUser 
                          ? 'bg-primary text-primary-foreground rounded-tl-2xl rounded-tr-sm rounded-bl-2xl' 
                          : 'bg-secondary text-secondary-foreground rounded-tl-sm rounded-tr-2xl rounded-br-2xl'
                        } px-4 py-3`}
                      >
                        <div className="flex items-center mb-1">
                          <span className="mr-1">{profile?.avatar}</span>
                          <span className="text-sm font-medium">{profile?.name}</span>
                          {message.isApology && (
                            <span className="ml-1 bg-white/20 text-xs px-1 rounded">Apology</span>
                          )}
                        </div>
                        <div>{message.content}</div>
                        {message.isApology && message.apologyReason && (
                          <div className="mt-1 text-sm bg-white/10 p-1 rounded">
                            Reason: {message.apologyReason}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <div className="space-y-4">
            {isMyTurn ? (
              <>
                <Textarea
                  placeholder={`Express your thoughts and feelings...`}
                  className="ios-input min-h-24"
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  disabled={!isMyTurn}
                />
                
                <div className="flex gap-2">
                  <Button 
                    onClick={handleSendMessage} 
                    className="ios-button flex-1"
                    disabled={!messageText.trim() || !isMyTurn}
                  >
                    Send Message
                  </Button>
                  
                  <Button 
                    onClick={handleApologize}
                    className="ios-button bg-accent text-accent-foreground"
                    disabled={!isMyTurn}
                  >
                    Apologize
                  </Button>
                </div>
              </>
            ) : (
              <div className="bg-amber-50 p-4 rounded-lg border border-amber-200 text-center">
                <p className="text-amber-800">
                  {`Waiting for ${partnerProfile.name} to respond...`}
                </p>
              </div>
            )}
            
            <Button
              onClick={handleReachAgreement}
              className="ios-button w-full bg-emerald-500 hover:bg-emerald-600"
            >
              We've Reached an Agreement
            </Button>
          </div>
        </div>
      </div>

      {/* Apology Dialog */}
      <Dialog open={showApologyDialog} onOpenChange={setShowApologyDialog}>
        <DialogContent className="ios-card">
          <DialogHeader>
            <DialogTitle>Apologize</DialogTitle>
          </DialogHeader>
          
          <div className="py-4">
            <p className="mb-4">
              Please explain why you are apologizing. A sincere apology will earn you 1000 like points.
            </p>
            <Textarea
              placeholder="I apologize because..."
              value={apologyReason}
              onChange={(e) => setApologyReason(e.target.value)}
              className="ios-input min-h-24"
            />
          </div>
          
          <DialogFooter>
            <Button 
              onClick={submitApology} 
              className="ios-button"
              disabled={!apologyReason.trim()}
            >
              Submit Apology
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Agreement Dialog */}
      <Dialog open={showAgreementDialog} onOpenChange={setShowAgreementDialog}>
        <DialogContent className="ios-card">
          <DialogHeader>
            <DialogTitle>Confirm Agreement</DialogTitle>
          </DialogHeader>
          
          <div className="py-4">
            <p className="mb-4">
              Are you both in agreement and ready to end the Road of Peace?
            </p>
            <p className="text-sm text-muted-foreground">
              If you resolve within 30 minutes of starting, both of you will earn 500 like points.
            </p>
          </div>
          
          <DialogFooter className="flex gap-2">
            <Button 
              variant="outline" 
              onClick={() => setShowAgreementDialog(false)}
            >
              Not Yet
            </Button>
            <Button 
              onClick={confirmAgreement} 
              className="ios-button bg-emerald-500 hover:bg-emerald-600"
            >
              Yes, We Agree
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RoadOfPeace;
