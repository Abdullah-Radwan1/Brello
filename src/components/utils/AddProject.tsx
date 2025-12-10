"use client";

import { useState, useMemo } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X, UserPlus, User, Loader2 } from "lucide-react";
import { DialogTitle } from "@radix-ui/react-dialog";
import { useGetUsers } from "@/lib/hooks/useUsers";
import { useDebounce } from "use-debounce";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProject } from "@/api/projects";
import { toast } from "@/lib/hooks/use-toast";
import { useNavigate } from "react-router-dom";

type User = { id: string; name: string };

// Payload for the backend
type CreateProjectPayload = {
  name: string;
  description?: string;
  contributors?: { userId: string }[];
};

const AddProject = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1);

  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  const [searchInput, setSearchInput] = useState("");
  const [debouncedSearch] = useDebounce(searchInput, 500);

  const page = 1;
  const limit = 6;

  const { data, isFetching } = useGetUsers(page, limit, debouncedSearch);

  const users = useMemo(
    () => (!isFetching && data ? data.users : []),
    [data, isFetching]
  );

  // -------------------- Mutation --------------------
  const {
    mutate: createProjectFn,
    data: createProjectData,
    isPending,
  } = useMutation({
    mutationFn: (payload: CreateProjectPayload) => createProject(payload),
    onSuccess: (data) => {
      resetForm();
      setOpen(false);
      toast({
        title: "Success",
        description: "Project created successfully!",
      });

      navigate(`/projects/${data.id}`);
      queryClient.invalidateQueries({
        queryKey: ["projects"],
      });
      // Optionally, refresh project list or show toast
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      }); // Optionally, show error toast
    },
  });

  const handleCreateProject = () => {
    if (!projectName || !description) return;

    const contributorsPayload =
      selectedUsers.length > 0
        ? selectedUsers.map((user) => ({ userId: user.id }))
        : undefined;

    createProjectFn({
      name: projectName,
      description,
      contributors: contributorsPayload,
    });
  };
  console.log(createProjectData);
  // -------------------- Handlers --------------------
  const addUser = (user: User) => {
    if (!selectedUsers.some((u) => u.id === user.id)) {
      setSelectedUsers((prev) => [...prev, user]);
    }
  };

  const removeUser = (id: string) => {
    setSelectedUsers((prev) => prev.filter((u) => u.id !== id));
  };

  const resetForm = () => {
    setProjectName("");
    setDescription("");
    setSelectedUsers([]);
    setSearchInput("");
    setStep(1);
  };

  const handleDialogChange = (val: boolean) => {
    setOpen(val);
    if (!val) resetForm();
  };

  const isStep1Valid = projectName.length >= 6 && description.length >= 10;

  // -------------------- JSX --------------------
  return (
    <Dialog open={open} onOpenChange={handleDialogChange}>
      <DialogTrigger asChild>
        <Button>Create New Project</Button>
      </DialogTrigger>

      <DialogContent className="max-w-screen-md overflow-y-auto p-8 rounded-xl">
        <div className="mb-4">
          <DialogTitle className="text-2xl font-semibold">
            {step === 1 ? "Create Project" : "Invite Contributors"}
          </DialogTitle>
        </div>

        {/* STEP 1 */}
        {step === 1 && (
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">
                Project Name
              </label>
              <Input
                placeholder="Enter project name"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                minLength={6}
                maxLength={40}
              />
              <p className="text-xs text-muted-foreground mt-1">
                Must be 6–40 characters
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
              <p className="text-xs text-muted-foreground mt-1">
                Must be 10–150 characters
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

        {/* STEP 2 */}
        {step === 2 && (
          <div className="space-y-6">
            <div>
              <div className="border rounded-lg p-2">
                <div className="relative">
                  <User
                    className="absolute left-2 top-2.5 text-muted-foreground"
                    size={18}
                  />
                  <Input
                    placeholder="Search users by name..."
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    className="pl-8 mb-2"
                  />
                  {isFetching && (
                    <Loader2
                      className="absolute right-2 top-2.5 animate-spin text-muted-foreground"
                      size={18}
                    />
                  )}
                </div>

                <div className="max-h-60 overflow-y-auto">
                  {!isFetching && users.length === 0 ? (
                    <p className="text-sm text-muted-foreground p-2">
                      No users found
                    </p>
                  ) : (
                    users.map((user) => (
                      <div
                        key={user.id}
                        onClick={() => addUser(user)}
                        className="flex items-center justify-between py-2 px-3 hover:bg-gray-100 cursor-pointer rounded-md"
                      >
                        <span className="text-foreground text-sm font-medium">
                          {user.name}
                        </span>
                        <UserPlus size={18} className="text-muted-foreground" />
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>

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
                      className="px-3 py-2 flex items-center gap-2 bg-slate-100 text-slate-700"
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

            <div className="flex justify-between pt-4">
              <Button variant="outline" onClick={() => setStep(1)}>
                Back
              </Button>
              <Button onClick={handleCreateProject} disabled={isPending}>
                {isPending ? (
                  <Loader2 className="animate-spin" size={18} />
                ) : (
                  "Create Project"
                )}
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AddProject;
