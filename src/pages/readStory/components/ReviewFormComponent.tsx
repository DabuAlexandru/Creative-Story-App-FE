import { ReactNode, useCallback, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { z } from 'zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input'
import { formFieldStyle } from '@/components/custom/TipTapEditor/utils';
import { StarFilledIcon, StarIcon } from '@radix-ui/react-icons';
import { Separator } from '@/components/ui/separator';
import { reviewSchema } from '../utils';
import { toNumber } from 'lodash';

export type ReviewType = {
  title: string;
  content: string;
  characterScore: number;
  conflictScore: number;
  plotScore: number;
  settingScore: number;
  themeScore: number;
};

const ScoreContainer = ({
  className,
  score,
  label,
  onChange,
  isGeneral
}: {
  className: string,
  score: number,
  label: string,
  onChange: (score: number) => void
  isGeneral?: boolean
}) => {
  const [previewScore, setPreviewScore] = useState<number | null>(null);

  const starIndexes = Array.from(Array(5).keys());

  const handleMouseEnter = (index: number) => {
    setPreviewScore(index + 1);
  };

  const handleMouseLeave = () => {
    setPreviewScore(null);
  };

  const displayedScore = previewScore !== null ? previewScore : score;
  const formattedScore = isGeneral ? displayedScore.toFixed(2) : (displayedScore + '')

  return (
    <div className={`flex items-center ${className}`}>
      {starIndexes.map((index: number) => {
        const isFullStar = index < toNumber(displayedScore);
        const starKey = `star-${index}-${isFullStar ? 'FULL' : 'EMPTY'}`;
        return (
          <div
            className='cursor-pointer px-[2px]'
            key={starKey}
            onClick={() => onChange(index + 1)}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
          >
            {isFullStar ? (
              <StarFilledIcon className='size-[20px]' />
            ) : (
              <StarIcon className='size-[20px]' />
            )}
          </div>
        );
      })}
      <span className="font-bold text-xl ml-2">{formattedScore}</span>
      <span className="ml-4">{label}</span>
    </div>
  );
};

const ReviewForm = ({ onReceiveResponse }: { onReceiveResponse: (review: ReviewType) => void }) => {
  const form = useForm<z.infer<typeof reviewSchema>>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      title: '',
      content: '',
      characterScore: 3,
      conflictScore: 3,
      plotScore: 3,
      settingScore: 3,
      themeScore: 3,
    },
  });

  const onSubmit = (data: ReviewType) => {
    onReceiveResponse(data);
    form.reset();
  };

  const handleGeneralScoreChange = useCallback((newScore: number) => {
    form.setValue('characterScore', newScore);
    form.setValue('conflictScore', newScore);
    form.setValue('plotScore', newScore);
    form.setValue('settingScore', newScore);
    form.setValue('themeScore', newScore);
  }, []);

  const characterScore = form.watch("characterScore");
  const conflictScore = form.watch("conflictScore");
  const plotScore = form.watch("plotScore");
  const settingScore = form.watch("settingScore");
  const themeScore = form.watch("themeScore");

  const overallScore = useMemo(() => {
    const scores = [characterScore, conflictScore, plotScore, settingScore, themeScore]
    return scores.reduce((sum, score) => sum + score, 0) / scores.length
  }, [characterScore, conflictScore, plotScore, settingScore, themeScore])

  return (
    <DialogContent className="sm:max-w-[425px] p-4">
      <DialogHeader><DialogTitle>Leave a Review</DialogTitle></DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem style={formFieldStyle}>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input disabled={false} type="title" placeholder="Enter title"  {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem style={formFieldStyle}>
                <FormLabel>Content</FormLabel>
                <FormControl>
                  <Textarea
                    disabled={false}
                    placeholder="Write your memos here"
                    typeof="content"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div>
            <FormLabel>How much did you enjoy it?</FormLabel>
            <div
              className="flex items-center mb-2"
              style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '0.5rem'
              }}>
            </div>
            <div className='flex justify-center'>
              <div className="mt-2 flex flex-col justify-center w-[62.5%]">
                <ScoreContainer className="w-[250px]" score={overallScore} label="General" onChange={handleGeneralScoreChange} isGeneral={true} />
                <Separator className="my-1" />
                <FormField
                  control={form.control}
                  name="characterScore"
                  render={({ field }) => (
                    <FormItem style={formFieldStyle}>
                      <FormControl>
                        <ScoreContainer
                          className="w-[250px]"
                          score={field.value}
                          onChange={field.onChange}
                          label="Character"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="conflictScore"
                  render={({ field }) => (
                    <FormItem style={formFieldStyle}>
                      <FormControl>
                        <ScoreContainer
                          className="w-[250px]"
                          score={field.value}
                          onChange={field.onChange}
                          label="Conflict"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="plotScore"
                  render={({ field }) => (
                    <FormItem style={formFieldStyle}>
                      <FormControl>
                        <ScoreContainer
                          className="w-[250px]"
                          score={field.value}
                          onChange={field.onChange}
                          label="Plot"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="settingScore"
                  render={({ field }) => (
                    <FormItem style={formFieldStyle}>
                      <FormControl>
                        <ScoreContainer
                          className="w-[250px]"
                          score={field.value}
                          onChange={field.onChange}
                          label="Setting"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="themeScore"
                  render={({ field }) => (
                    <FormItem style={formFieldStyle}>
                      <FormControl>
                        <ScoreContainer
                          className="w-[250px]"
                          score={field.value}
                          onChange={field.onChange}
                          label="Theme"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>
          <Separator />
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: '8px' }}>
            <Button disabled={false} type="submit">Submit</Button>
          </div>
        </form>
      </Form>
    </DialogContent>
  );
};

const ModalReviewDialog = ({ onReceiveResponse, children }: { onReceiveResponse: (review: ReviewType) => void, children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <ReviewForm onReceiveResponse={(review: ReviewType) => {
        onReceiveResponse(review);
        setIsOpen(false);
      }} />
    </Dialog>
  );
};

export default ModalReviewDialog;