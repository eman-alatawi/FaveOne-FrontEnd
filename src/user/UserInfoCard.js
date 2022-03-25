import React from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import UserAvatar from "./UserAvatar";
import Typography from "@material-ui/core/Typography";

export default function UserInfoCard({ userInfo }) {
  return (
    <Card className="w-80 h-1/4 shadow-lg m-3 formBG text-gray-200">
      <CardHeader
        avatar={<UserAvatar imageSrc={userInfo.profileImage} />}
      />
      <div className=" h-58 p-4 flex flex-col items-start text-gray-200">
        <div className="w-56  overflow-auto ">
          <CardHeader
            title={`User Name: ${userInfo.userName ? userInfo.userName : ""}`}
            subheader={`Role: ${
              userInfo.userRole
                ? userInfo.userRole === "ROLE_ADMIN"
                  ? "Admin"
                  : "User"
                : ""
            }`}
            className="text-gray-200"
          />
        </div>
        <CardContent>
          <Typography variant="body1" component="p">
            {`Email Adress: ${
              userInfo.emailAddress ? userInfo.emailAddress : ""
            }`}
          </Typography>
        </CardContent>
      </div>
    </Card>
  );
}
