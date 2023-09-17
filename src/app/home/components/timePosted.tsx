import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import { parseISO, format } from 'date-fns';

const PostTimePosted = ({ timePosted }: { timePosted: string }) => {
  // Parse the timePosted string to a Date object
  const timePostedDate = parseISO(timePosted);

  // Format the timePostedDate in "DD.MM.YYYY" format
  const formattedTimePosted = format(timePostedDate, 'dd.MM.yyyy');

  return (
    <div className="post-informations">
      <span className="post-informations__timePosted">
        <FontAwesomeIcon icon={faCalendar} />
        {formattedTimePosted}
      </span>
    </div>
  )
};

export default PostTimePosted;
