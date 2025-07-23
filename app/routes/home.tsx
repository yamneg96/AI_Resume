import Navbar from "~/components/Navbar";
import type { Route } from "./+types/home";
import { resumes } from "~/constants";
import ResumeCard from "~/components/ResumeCard";
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router';
import { usePuterStore } from '~/lib/puter'

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Resumind" },
    { name: "description", content: "Smart feedback for your dream job." },
  ];
}

export default function Home() {

  const {auth} = usePuterStore();
  //all the three below coming from the react router.
  const navigate = useNavigate();

  useEffect(() => { //to check incase the user already logged in.
    if(!auth.isAuthenticated){
      navigate('/auth/?next=/');
    }
  }, [auth.isAuthenticated])

  return <main className="bg-[url('/images/bg-main.svg')] bg-cover">

    <Navbar />    

    <section className="main-section">
      <div className="page-heading py-16">
        <h1>
          Track Your Applications & Resume Ratings
        </h1>
        <h2>
          Review your submissions and check AI-powered feedback.
        </h2>
      </div>
    {/* Map through arrays resume reviews. */}

      {resumes.length > 0 && (
        <div className="resumes-section">
          {resumes.map((resume) =>(
            <ResumeCard key={resume.id} resume={resume}/>
          ))}
        </div>
      )}
    </section>
  </main>
}
