import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Video } from "lucide-react";

const videoData = [
    {
        title: "My Mission: Mental Health Resources",
        link: "https://www.youtube.com/embed/_LJMF0dxV2s?si=mON1waoMP8ClamF_",
    },
    {
        title: "NAMI Homefront Mental Health Resources",
        link: "https://www.youtube.com/embed/XYK75T4FkXo?si=aNzGJ-LjoQo_tg01",
    },
    {
        title: "Mental Health Resources for Women",
        link: "https://www.youtube.com/embed/fTzSy_EtseA?si=n7gwfyIWUgHlbOrY",
    },
    {
        title: "How and Where to Find Resources and Supports for Mental Health",
        link: "https://www.youtube.com/embed/z92qPeMIrQY?si=n6boQmqCk7r4DE-c",
    },
    {
        title: "You’re Not Alone: Finding Support & Resources",
        link: "https://www.youtube.com/embed/erzybgKGZrs?si=0Iq_WQYetsp-N26D",
    },
    {
        title: "Helpful Mental Health Resources",
        link: "https://www.youtube.com/embed/mCRBwiIHboA?si=w7_jawnzQ6XGoE1K",
    },
];

const CoursesPage = () => {
    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <Separator />
                <div className="grid gap-4 grid-cols-1 sm:grid-cols-3">
                    {videoData.map((video, index) => (
                        <Card key={index}>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">
                                    {video.title}
                                </CardTitle>
                                <Video className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent className="aspect-w-16 aspect-h-9 h-[300px]">
                                <iframe
                                    src={video.link}
                                    title={video.title}
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    referrerPolicy="strict-origin-when-cross-origin"
                                    allowFullScreen
                                    className="w-full h-full"
                                ></iframe>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CoursesPage;
