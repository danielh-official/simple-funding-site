import { store } from '@/actions/App/Http/Controllers/Dashboard/FundingPage/FundingPageUpdateController';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { FundingPage } from '@/pages/dashboard/funding-pages';
import { Form } from '@inertiajs/react';

interface PostUpdateToFundingPageModalProps {
    fundingPage: FundingPage;
    isOpen: boolean;
    onClose: () => void;
}

export default function PostModal({
    fundingPage,
    isOpen,
    onClose,
}: PostUpdateToFundingPageModalProps) {
    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader className="flex items-center justify-center">
                    <DialogTitle>
                        Post Update To Funding Page &mdash; {fundingPage.title}
                    </DialogTitle>
                </DialogHeader>

                <div className="flex flex-col items-center space-y-5">
                    <Form
                        action={store()}
                        className="w-full space-y-4"
                        transform={(data) => ({
                            ...data,
                            funding_page_id: fundingPage.uuid,
                        })}
                    >
                        <div className="flex w-full flex-col space-y-2">
                            <label
                                htmlFor="title"
                                className="text-sm font-medium"
                            >
                                Title
                            </label>
                            <Input
                                type="text"
                                id="title"
                                name="title"
                                className="mt-1 w-full rounded border border-gray-300 p-2 focus:border-[#f53003] focus:ring-1 focus:ring-[#f53003] focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-[#FF4433] dark:focus:ring-[#FF4433]"
                                placeholder="Title"
                                required
                            />
                        </div>
                        <div className="flex w-full flex-col space-y-2">
                            <label
                                htmlFor="content"
                                className="text-sm font-medium"
                            >
                                Content
                            </label>
                            <textarea
                                id="content"
                                name="content"
                                rows={4}
                                className="w-full rounded border border-gray-300 p-2 focus:border-[#f53003] focus:ring-1 focus:ring-[#f53003] focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-[#FF4433] dark:focus:ring-[#FF4433]"
                                placeholder="Write your update here..."
                                required
                            ></textarea>
                        </div>

                        <div className="mt-4 flex justify-end space-x-2">
                            <Button
                                type="button"
                                className="rounded bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-300 dark:bg-gray-600 dark:text-white dark:hover:bg-gray-500"
                                onClick={onClose}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                className="cursor-pointer rounded bg-[#f53003] px-4 py-2 text-sm font-medium text-white hover:bg-[#d82a00] dark:bg-[#FF4433] dark:hover:bg-[#d82a00]"
                            >
                                Post Update
                            </Button>
                        </div>
                    </Form>
                </div>
            </DialogContent>
        </Dialog>
    );
}
