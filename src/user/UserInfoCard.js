import React from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import UserAvatar from "./UserAvatar";
import Typography from "@material-ui/core/Typography";

export default function UserInfoCard({ userInfo }) {
  return (
    <Card className="w-80 h-1/4 shadow-lg m-3">
      <CardHeader
        className="bg-indigo-300"
        avatar={<UserAvatar imageSrc={userInfo.profileImage} />}
      />
      <div className=" h-48 p-4 flex flex-col items-start bg-blue-100">
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
