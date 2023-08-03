import { Badge, Card, Avatar } from "antd";
import Link from "next/link";
import { currencyFormatter } from "../../utils/helpers";
import { Rate } from "antd";

const { Meta } = Card;

const CourseCard = ({ loading, course }) => {
  const { name, instructor, price, image, slug, paid, category } = course;

  return (
    <Link href={`/course/${slug}`}>
      <a>
        <Card
          loading={loading}
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
          <Meta
            avatar={
              <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=1" />
            }
            title={name}
            description={`by ${instructor.name}`}
            style={{ marginBottom: "10px" }}
          />
          <Badge
            count={category}
            style={{ backgroundColor: "#03a9f4" }}
            className="pb-2 mr-2"
          />
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              flexWrap: "wrap",
            }}
          >
            <h4 className="pt-2">{paid ? "₹ " + price : "Free"}</h4>
            <Rate
              onChange={() => console.log(" start pressed")}
              allowHalf
              defaultValue={2.5}
            />
          </div>
        </Card>
      </a>
    </Link>
  );
};

export default CourseCard;
