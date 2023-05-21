import { Badge, Card } from "antd";
import Link from "next/link";
import { currencyFormatter } from "../../utils/helpers";
import Image from "next/image";

const { Meta } = Card;

const CourseCard = ({ course }) => {
  console.log("course=>", course);
  const { name, instructor, price, image, slug, paid, category } = course;
  console.log("image=>", image);
  // const imageUrl = image.Location;

  return (
    <Link href={`/course/${slug}`}>
      <a>
        <Card
          className="mb-4"
          cover={
            <img
              src={
                image?.Location
                  ? image?.Location
                  : "https://skg-edemy-bucket.s3.amazonaws.com/Image_not_available.png"
              }
              alt={name}
              style={{ objectFit: "cover" }}
              className="p-1"
            />
          }
        >
          <h2 className="font-weight-bold">{name}</h2>
          <p>by {instructor.name}</p>
          <Badge
            count={category}
            style={{ backgroundColor: "#03a9f4" }}
            className="pb-2 mr-2"
          />
          <h4 className="pt-2">
            {paid
              ? currencyFormatter({
                  amount: price,
                  currency: "inr", // want to change currency change here
                })
              : "Free"}
          </h4>
        </Card>
      </a>
    </Link>
  );
};

export default CourseCard;
