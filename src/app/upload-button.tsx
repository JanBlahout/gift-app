'use client';
import { Button } from '@/components/ui/button';
import { useOrganization, useUser } from '@clerk/nextjs';
import { useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { Loader2 } from 'lucide-react';

const formSchema = z.object({
  title: z.string().min(2).max(200),
  description: z.string().optional(),
  for: z.string().min(3).max(20),
  price: z.string(),
  url: z.string().optional(),
});

export function UploadButton() {
  const { toast } = useToast();
  const organization = useOrganization();
  const user = useUser();
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const generateUploadUrl = useMutation(api.gifts.generateUploadUrl);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      for: '',
      price: '',
      url: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    if (!orgId) return;

    // const postUrl = await generateUploadUrl();

    // const result = await fetch(postUrl, {
    //   method: 'POST',
    //   headers: { 'Content-Type': values.file[0].type },
    //   body: values.file[0],
    // });

    // const { storageId } = await result.json();
    // Step 3: Save the newly allocated storage id to the database
    // await sendImage({ storageId, author: name });
    try {
      await createGift({
        name: values.title,
        description: values.description,
        for: values.for,
        price: values.price,
        url: values.url,
        orgId,
      });

      form.reset();

      setIsModalOpen(false);

      toast({
        variant: 'success',
        title: 'Gift created',
        description: 'Gift is now available in the list',
      });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Something went wrong',
        description: "Gift coudln't be created, please try again later.",
      });
    }
  }

  let orgId: string | undefined = undefined;
  if (organization.isLoaded && user.isLoaded) {
    orgId = organization.organization?.id ?? user.user?.id;
  }

  const createGift = useMutation(api.gifts.createGift);

  return (
    <Dialog
      open={isModalOpen}
      onOpenChange={(isOpen) => {
        setIsModalOpen(isOpen);
        form.reset();
      }}
    >
      <DialogTrigger asChild>
        <Button onClick={() => {}}>Add a gift</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a gift</DialogTitle>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea {...field} className="resize-none" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="for"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>For:</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Url</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                disabled={form.formState.isSubmitting}
                className="flex gap-2"
              >
                {form.formState.isSubmitting && (
                  <Loader2 className="animate-spin h-4 w-4" />
                )}
                Submit
              </Button>
            </form>
          </Form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
