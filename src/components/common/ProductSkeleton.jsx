
export default function ProductSkeleton() {
    return (
        <article className="flex flex-col gap-6 p-6 md:p-8 bg-card rounded-[2.5rem] border border-primary/10 animate-pulse">
            <div className="w-full aspect-square rounded-[2rem] bg-muted" />
            <div className="space-y-4 flex flex-col items-center">
                <div className="h-4 bg-muted rounded-full w-24" />
                <div className="h-8 bg-muted rounded-full w-3/4" />
                <div className="h-16 bg-muted rounded-2xl w-full" />
                <div className="h-10 bg-muted rounded-full w-32" />
            </div>
        </article>
    );
}
