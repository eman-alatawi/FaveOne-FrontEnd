import React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import UserAvatar from './UserAvatar';
import Typography from '@material-ui/core/Typography';

export default function UserInfoCard({userInfo}) {

  return (
    <Card  className="max-w-xs shadow-lg m-3">
      <CardHeader
        avatar={
            <UserAvatar imageSrc={userInfo.profileImage}/>
        }
      />
      <div className="flex flex-col items-center bg-blue-100">
      <CardHeader
       
        title={userInfo.userName}
        subheader={userInfo.userRole}
      />
      <CardContent>
        <Typography variant="body2"  component="p">
          {userInfo.emailAddress}
        </Typography>
      </CardContent>
      </div>
    </Card>
  );
}
