"use client";

import React, { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { Badge } from "@/components/ui/badge";
import { X, UserPlus } from "lucide-react";
import { DialogTitle } from "@radix-ui/react-dialog";

const mockUsers = [
  { id: 1, name: "Ahmed Khaled", email: "ahmed@example.com" },
  { id: 2, name: "Sara Mostafa", email: "sara@example.com" },
  { id: 3, name: "John Doe", email: "john@example.com" },
  { id: 4, name: "Maya Adel", email: "maya@example.com" },
  { id: 5, name: "David Smith", email: "david@example.com" },
];

interface User {
  id: number;
  name: string;
  email: string;
}

const AddProject = () => {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1);

  // Step 1 fields
  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");

  // Step 2 fields
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  const [query, setQuery] = useState("");

  const filteredUsers = mockUsers.filter((user) =>
    user.name.toLowerCase().includes(query.toLowerCase())
  );

  const addUser = (user: User) => {
    if (!selectedUsers.some((u) => u.id === user.id)) {
      setSelectedUsers([...selectedUsers, user]);
    }
  };

  const removeUser = (id: number) => {
    setSelectedUsers(selectedUsers.filter((u) => u.id !== id));
  };

  const resetForm = () => {
    setProjectName("");
    setDescription("");
    setSelectedUsers([]);
    setQuery("");
    setStep(1);
  };

  const handleDialogChange = (val: boolean) => {
    setOpen(val);
    if (!val) resetForm();
  };

  const handleCreateProject = () => {
    console.log({
      projectName,
      description,
      selectedUsers,
    });
    setOpen(false);
    resetForm();
  };

  const isStep1Valid = projectName.length >= 4 && description.length >= 10;

  return (
    <Dialog open={open} onOpenChange={handleDialogChange}>
      <DialogTrigger asChild>
        <Button>Create New Project</Button>
      </DialogTrigger>

      <DialogContent className="max-w-screen-md overflow-y-auto p-8 rounded-xl">
        {/* Header */}
        <div className="mb-6">
          <DialogTitle className="text-2xl font-semibold">
            {step === 1 ? "Create Project" : "Invite Contributors"}
          </DialogTitle>
        </div>

        {/* Step 1: Project Details */}
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <label className="text-sm font-medium mb-2 block">
                Project Name
              </label>
              <Input
                placeholder="Enter project name"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                minLength={4}
                maxLength={40}
              />
              <p className="text-xs text-muted-foreground mt-2">
                Must be 4-40 characters
              </p>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">
                Description
              </label>
              <Textarea
                placeholder="Write a description..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                minLength={10}
                maxLength={150}
                rows={4}
              />
              <p className="text-xs text-muted-foreground mt-2">
                Must be 10-150 characters
              </p>
            </div>

            <Button
              className="w-full"
              disabled={!isStep1Valid}
              onClick={() => setStep(2)}
            >
              Next
            </Button>
          </div>
        )}

        {/* Step 2: Invite Users */}
        {step === 2 && (
          <div className="space-y-6">
            <div>
              <label className="text-sm font-medium mb-3 block">
                Invite Users
              </label>

              <Command className="border rounded-lg">
                <CommandInput
                  placeholder="Search users by name..."
                  value={query}
                  onValueChange={setQuery}
                />
                <CommandEmpty>No users found</CommandEmpty>
                <CommandGroup className="max-h-60 overflow-y-auto">
                  {filteredUsers.map((user) => (
                    <CommandItem
                      key={user.id}
                      onSelect={() => addUser(user)}
                      className="flex items-center justify-between py-3"
                    >
                      <div>
                        <span className="font-medium">{user.name}</span>
                        <span className="text-muted-foreground text-sm ml-2">
                          {user.email}
                        </span>
                      </div>
                      <UserPlus size={18} className="text-muted-foreground" />
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </div>

            {/* Selected Users */}
            {selectedUsers.length > 0 && (
              <div>
                <label className="text-sm font-medium mb-3 block">
                  Selected Users ({selectedUsers.length})
                </label>
                <div className="flex flex-wrap gap-2">
                  {selectedUsers.map((user) => (
                    <Badge
                      key={user.id}
                      variant="secondary"
                      className="px-3 py-2 flex items-center gap-2"
                    >
                      <span>{user.name}</span>
                      <X
                        size={14}
                        className="cursor-pointer hover:text-destructive transition-colors"
                        onClick={() => removeUser(user.id)}
                      />
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-4">
              <Button variant="outline" onClick={() => setStep(1)}>
                Back
              </Button>
              <Button onClick={handleCreateProject}>Create Project</Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AddProject;
