import { toast } from "@/components/ui/use-toast";
import { APIResponseType, StateSetter } from "@/utils/types/general.types";

type EffectFunction = () => Promise<void>;

export const makeRequest = async <T>({
  request,
  setObject,
  setIsLoading,
  onReceiveResponse,
  onSuccessEffect,
  onFailEffect,
  displaySuccessMessage = false,
  successMessage = 'Success',
}: {
  request: () => Promise<APIResponseType>,
  setObject: StateSetter<T>,
  setIsLoading: StateSetter<boolean>,
  onReceiveResponse?: (data: T) => Promise<void>,
  onSuccessEffect?: EffectFunction,
  onFailEffect?: EffectFunction,
  displaySuccessMessage?: Boolean
  successMessage?: string,
}) => {
  try {
    setIsLoading(true);
    const response = await request();

    if (response.error) {
      if (onFailEffect) await onFailEffect();
      toast({ variant: 'destructive', title: 'There was an error!', description: response.message });
    } else {
      const responsePayload = response.data;
      if (setObject) setObject(responsePayload);
      if (onReceiveResponse) await onReceiveResponse(responsePayload);
      if (onSuccessEffect) await onSuccessEffect();
      if (displaySuccessMessage) {
        toast({ description: successMessage || 'The request was successful!' });
      }
    }
  } catch (error: any) {
    console.error(error)
    const title = error?.message || 'An error occured.'
    const description = error?.stack || JSON.stringify(error)
    toast({ variant: 'destructive', title, description });
  } finally {
    setIsLoading(false);
  }
};