import React, { useState } from 'react';
import InterviewForm from './InterviewForm.jsx';
import QuestionList from './QuestionList.jsx';
import { useParams } from 'react-router-dom';
import InterviewLink from './InterviewLink.jsx';
import toast from 'react-hot-toast';

const InterviewPage = () => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        email: '',
        duration: '',
        interviewType: []
    });
    const [interviewId, setInterviewId] = useState("")
    const handleInterviewId = (interviewId) => {
        setInterviewId(interviewId)
    }
    return (
        <div className="flex flex-col items-center pt-8"> {/* Added top padding */}
            {/* Progress Bar Container with margins */}
            <div className="w-full max-w-md mb-8 mt-4 mx-auto px-4"> {/* Added margins and padding */}
                <progress
                    className="progress w-full max-w-md
                    [&::-webkit-progress-value]:bg-gradient-to-r
                [&::-webkit-progress-value]:from-pink-500
                [&::-webkit-progress-value]:to-violet-500
                [&::-moz-progress-bar]:bg-gradient-to-r
                [&::-moz-progress-bar]:from-pink-500
                [&::-moz-progress-bar]:to-violet-500"
                    value={step * 33.33}
                    // style={{ background: '#009688' }}
                    max="100"
                ></progress>
            </div>

            {
                step === 1 ? <InterviewForm goToNext={() => setStep(prev => prev + 1)} formData={formData}
                    setFormData={setFormData} /> : step === 2 ?
                    <QuestionList onCreateLink={(interviewId) => handleInterviewId(interviewId)}
                        goBack={(() => setStep(step - 1))} goToNext={() => setStep(prev => prev + 1)}
                        formData={formData} /> : step === 3 ? <InterviewLink interviewId={interviewId} formData={formData} /> : null
            }
        </div >
    );
};

export default InterviewPage;