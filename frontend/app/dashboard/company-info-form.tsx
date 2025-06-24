"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pencil, Save, X } from "lucide-react";

export function CompanyInfoForm() {
  const [companyUrl, setCompanyUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [suggestion, setSuggestion] = useState<string | null>(null);
  const [message, setMessage] = useState<{text: string; isError: boolean} | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedDescription, setEditedDescription] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyUrl.trim()) return;

    setIsLoading(true);
    setMessage(null);
    
    try {
      const response = await fetch("/api/company-info", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ companyUrl }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to get company info");
      }

      setSuggestion(data.company_description);
      setEditedDescription(data.company_description);
      setMessage({ text: "Company information processed successfully!", isError: false });
    } catch (error) {
      console.error("Error:", error);
      const errorMessage = error instanceof Error ? error.message : "Something went wrong";
      setMessage({ text: `Error: ${errorMessage}`, isError: true });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveDescription = async () => {
    if (!editedDescription.trim()) return;
    
    setIsSaving(true);
    setMessage(null);
    
    try {
      const response = await fetch("/api/company-info", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          companyUrl: companyUrl,
          companyDescription: editedDescription 
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to update company description");
      }

      setSuggestion(editedDescription);
      setIsEditing(false);
      setMessage({ text: "Description updated successfully!", isError: false });
    } catch (error) {
      console.error("Error updating description:", error);
      const errorMessage = error instanceof Error ? error.message : "Something went wrong";
      setMessage({ text: `Error: ${errorMessage}`, isError: true });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-medium">Add Company Information</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex gap-2">
          <Input
            type="url"
            placeholder="Enter company URL (e.g., https://example.com)"
            value={companyUrl}
            onChange={(e) => setCompanyUrl(e.target.value)}
            className="flex-1"
            required
          />
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Processing..." : "Submit"}
          </Button>
        </div>
      </form>
      
      {message && (
        <div className={`mt-4 p-4 rounded-lg ${message.isError ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
          <p className="text-sm">{message.text}</p>
        </div>
      )}
      {suggestion && (
        <div className="mt-4 p-4 bg-muted rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-medium">
              {isEditing ? 'Edit Description' : 'Suggested Description'}
            </h3>
            {!isEditing ? (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => {
                  setIsEditing(true);
                  setEditedDescription(suggestion);
                }}
                className="text-muted-foreground hover:text-foreground"
              >
                <Pencil className="h-4 w-4 mr-1" /> Edit
              </Button>
            ) : (
              <div className="space-x-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setIsEditing(false)}
                  disabled={isSaving}
                >
                  <X className="h-4 w-4 mr-1" /> Cancel
                </Button>
                <Button 
                  size="sm" 
                  onClick={handleSaveDescription}
                  disabled={isSaving}
                >
                  {isSaving ? 'Saving...' : (
                    <>
                      <Save className="h-4 w-4 mr-1" /> Save
                    </>
                  )}
                </Button>
              </div>
            )}
          </div>
          
          {isEditing ? (
            <textarea
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
              className="min-h-[150px] w-full px-3 py-2 rounded-md border border-input bg-background text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50"
              disabled={isSaving}
            />
          ) : (
            <p className="text-sm text-muted-foreground whitespace-pre-line">{suggestion}</p>
          )}
        </div>
      )}
    </div>
  );
}
