import Image from "next/image";

export default function PostDetailItem({icon, alt, label, size}: {
    icon: string;
    alt:string;
    label:string;
    size: number;
}) {
    return (
        <div className="flex flex-row gap-2 items-center">
            <Image src={icon} alt={alt} width={size} height={size} />
            <p>{label}</p>
        </div>
    )
}
