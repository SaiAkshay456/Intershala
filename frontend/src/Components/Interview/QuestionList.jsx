import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from "axios";
import toast from 'react-hot-toast';
import { ClipLoader } from 'react-spinners';
const QuestionList = ({ goBack, formData }) => {
    const [questionList, setQuestionList] = useState([]);
    const [loading, setLoading] = useState(true);

    const { id } = useParams();

    useEffect(() => {
        if (formData) {
            generateQuestionList();
        }
    }, [formData])

    const generateQuestionList = async () => {
        try {
            const data = await axios.post("http://localhost:3030/api/v1/interview/generate-questions", { ...formData }, {
                withCredentials: true,
            });
            console.log(data);
            setLoading(false);
            // setQuestionList(data)
        } catch (err) {
            toast.error("error generate question")
        }
        finally {
            setLoading(false);
        }
    }
    return (
        <div>
            question list
            <button onClick={() => goBack()}>Back to prev</button>
            {loading && <>
                <div className="text-center">
                    <ClipLoader size={50} color={"#000"} loading={loading} />
                    <h5>Sit tight! Our AI is thoughtfully crafting personalized interview questions just for you ✨"</h5>
                </div>
            </>}



        </div>
    )
}

export default QuestionList
