import { Requester, RequesterScores } from '../types';
import { calculateAverageScore } from './turkopticon';

interface BadgeData {
  status?: Status;
  progress?: Progress;
  text: string;
}

type Status = 'success' | 'info' | 'attention' | 'warning';
type Progress = 'incomplete' | 'partiallyComplete' | 'complete';

export const calculateAllBadges = (requester: Requester): BadgeData[] => {
  const tentativeBadges: (BadgeData | null)[] = [
    calculateScoreBadge(requester.attrs),
    calculateReviewsBadge(requester.reviews)
  ];

  return tentativeBadges.filter(el => el !== null).slice(0, 3) as BadgeData[];
};

const calculateScoreBadge = (scores: RequesterScores): BadgeData => {
  const average = parseFloat(calculateAverageScore(scores));
  const status = assignScoreColor(average);
  const text = assignScoreText(status);
  return {
    status,
    text
  };
};

const assignScoreColor = (score: number): Status => {
  if (score < 2) {
    return 'warning';
  } else if (score < 3) {
    return 'attention';
  } else if (score < 4) {
    return 'info';
  } else {
    return 'success';
  }
};

const assignScoreText = (status: Status): string => {
  switch (status) {
    case 'warning':
      return 'Low T.O.';
    case 'attention':
      return 'OK T.O.';
    case 'info':
      return 'Good T.O.';
    case 'success':
      return 'Great T.O.';
    default:
      return 'Invalid average T.O.';
  }
};

const calculateReviewsBadge = (reviews: number): BadgeData | null => {
  const lowReviewsBadge: BadgeData = {
    text: 'Few reviews',
    progress: 'incomplete'
  };

  return reviews < 4 ? lowReviewsBadge : null;
};