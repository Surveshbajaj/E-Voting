import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthProvider";
import { useVoting } from "../context/VotingContex";
import axios from "axios";
import { jwtDecode } from "jwt-decode"; // Remove curly braces
import toast from "react-hot-toast";

export default function Card({ candidate }) {
  const [authUser, setAuthUser] = useAuth();
  const { hasVoted, castVote } = useVoting();
  const [isVoted, setIsVoted] = useState(false);

  useEffect(() => {
    const decodedToken = jwtDecode(authUser);
    setIsVoted(decodedToken.voted);
  }, [authUser]);

  const handleVote = async (candidateId) => {
    if (isVoted || hasVoted) {
      toast.error("You have already voted");

      return;
    }

    try {
      // Send a POST request to the backend route to record the vote
      const response = await axios.post(
        `http://localhost:8000/candidate/vote/${candidateId}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${authUser}`,
          },
        }
      );

      castVote(); // Update the voting context state
    } catch (err) {
      if (err.response && err.response.status === 409) {
        alert("You have already voted.");
      } else if (jwtDecode(authUser).role == "admin") {
        toast.error("You are not allowed to vote");
        return;
      } else {
        console.log(err);

        toast.error("An error occurred while recording your vote.");
      }
    }
  };

  return (
    <div>
      <div className="card w-8- bg-base-100 shadow-xl m-3">
        {/* <figure>
          <img
            src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
            alt="Shoes"
          />
        </figure> */}
        <div className="card-body">
         <div className="flex justify-between">
         <h2 className="card-title">{candidate.name}</h2>
        
          {/* <div>
            <img
              className=" w-12 rounded-full h-12 "
              src="data:image/jpeg;base64,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"
              alt="Shoes"
            />
          </div> */}
         </div>
         <p>{candidate.party}</p>
          <div className="card-actions justify-between items-center">
            <button
              className="btn btn-primary"
              onClick={() => handleVote(candidate.id)}
              disabled={isVoted || hasVoted}
            >
              {isVoted || hasVoted ? "Voted" : "Vote"}
            </button>

            <div>
              {jwtDecode(authUser).role == "admin" && candidate.count.length}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
