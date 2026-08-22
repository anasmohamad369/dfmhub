import React from "react";
import { CheckCircle2, RotateCcw } from "lucide-react";
import { ProjectRegistrationEntity } from "../../domain/entities/ProjectRegistration";
import { Button } from "@/components/ui/button";

interface RegistrationSuccessCardProps {
  project: ProjectRegistrationEntity | null;
  onReset: () => void;
}

export function RegistrationSuccessCard({
  project,
  onReset,
}: RegistrationSuccessCardProps) {
  return (
    <div className="text-center py-8 space-y-6">
      <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl flex items-center justify-center mx-auto text-emerald-400 shadow-xl">
        <CheckCircle2 className="w-10 h-10" />
      </div>
      <div className="space-y-2">
        <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block">
          REGISTRATION SUCCESSFUL
        </span>
        <h2 className="text-2xl font-bold text-white">
          Project Registered Successfully!
        </h2>
        <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
          Thank you for registering{" "}
          <strong className="text-white">{project?.companyName}</strong>. Our
          engineering team will review your requirements and get back to you
          within 24 hours.
        </p>
      </div>

      {project && (
        <div className="bg-[#040914] border border-slate-800 rounded-xl p-4 text-left max-w-md mx-auto space-y-2 text-xs">
          <div className="flex justify-between border-b border-slate-800 pb-2">
            <span className="text-slate-400">Reference ID:</span>
            <span className="text-amber-400 font-bold">{project.id}</span>
          </div>
          <div className="flex justify-between border-b border-slate-800 pb-2">
            <span className="text-slate-400">Company Name:</span>
            <span className="text-white">{project.companyName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Contact Email:</span>
            <span className="text-white">{project.email}</span>
          </div>
        </div>
      )}

      <div className="pt-2">
        <Button
          onClick={onReset}
          className="w-full max-w-md mx-auto flex items-center justify-center gap-2 cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Register Another Project</span>
        </Button>
      </div>
    </div>
  );
}
