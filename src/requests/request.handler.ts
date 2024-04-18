import { APIResponseType, StateSetter } from "@/utils/types/general.types";

type EffectFunction = () => Promise<void>;

export const makeRequest = async <T>({
  request,
  setObject,
  setIsLoading,
  toast,
  onReceiveResponse,
  onSuccessEffect,
  onFailEffect,
  displaySuccessMessage = false,
  successMessage = 'Success',
}: {
  request: () => Promise<APIResponseType>,
  setObject: StateSetter<T>,
  setIsLoading: StateSetter<boolean>,
  toast: any,
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
      toast({ type: 'danger', title: 'There was an error!', message: response.message });
    } else {
      const responsePayload = response.data;
      if (setObject) setObject(responsePayload);
      if (onReceiveResponse) await onReceiveResponse(responsePayload);
      if (onSuccessEffect) await onSuccessEffect();
      if (displaySuccessMessage) {
        toast({ message: successMessage || 'The request was successful!' });
      }
    }
  } catch (error) {
    toast({ type: 'danger', message: 'An error occurred' });
  } finally {
    setIsLoading(false);
  }
};