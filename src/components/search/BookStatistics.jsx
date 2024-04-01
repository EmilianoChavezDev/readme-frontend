import formatNumber from "@/utils/formatNumber";
import { FaComment, FaRegEye, FaStar } from "react-icons/fa";

const BookStatistics = ({ views, stars, comments }) => {
    return (
        <div className="flex flex-row gap-3 justify-start items-center font-bold w-full text-sm">
            <div className="flex flex-row gap-1 items-center">
                <div>
                    <FaRegEye />
                </div>
                <div>
                    {formatNumber({ value: views })}
                </div>
            </div>

            <div className="flex flex-row gap-1 items-center">
                <div>
                    <FaStar />
                </div>
                <div>
                    {formatNumber({ value: stars })}
                </div>
            </div>

            <div className="flex flex-row gap-1 items-center">
                <div>
                    <FaComment />
                </div>
                <div>
                    {formatNumber({ value: comments })}
                </div>
            </div>

        </div>
    );
}

export default BookStatistics;