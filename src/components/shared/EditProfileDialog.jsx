import * as React from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useUpdateUserProfileMutation } from "@/redux/features/apiSlice/authApi";

export function EditProfileDialog({ user, refetch }) {

  const [updateUserProfile, { isLoading }] = useUpdateUserProfileMutation();
  const [open, setOpen] = React.useState(false);

  const [form, setForm] = React.useState({
    name: "",
    email: "",
    image: null,
  });

  React.useEffect(() => {
    if (user) {
      setForm({
        name: user.name || "",
        email: user.email || "",
        image: null,
      });
    }
  }, [user]);

  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append("name", form.name);

      if (form.image) {
        formData.append("profilePicture", form.image);
      }

      await updateUserProfile(formData).unwrap();

      await refetch();       // ✅ refresh data
      setOpen(false);        // ✅ close dialog

    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="rounded-full">Edit Profile</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          
          <Input
            placeholder="Name"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />

          <Input
            value={form.email}
            disabled
          />

          <Input
            type="file"
            onChange={(e) =>
              setForm({ ...form, image: e.target.files[0] })
            }
          />

          <Button
            onClick={handleSave}
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? "Updating..." : "Save Changes"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}