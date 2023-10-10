import { HiOutlineLightBulb } from 'react-icons/hi';
import { MdDirectionsRun } from 'react-icons/md';
import { BiParty } from 'react-icons/bi';
import { BsMusicNoteList } from 'react-icons/bs';
import { FiUsers } from 'react-icons/fi';
import { GiDramaMasks } from 'react-icons/gi';

const quiz = HiOutlineLightBulb;
const sports = MdDirectionsRun;
const party = BiParty;
const music = BsMusicNoteList;
const social = FiUsers;
const culture = GiDramaMasks;

export const categories = [
    {
        label: 'Quiz',
        icon: quiz,
        description: 'This is a quiz event',
    },
    {
        label: 'Sports',
        icon: sports,
        description: 'This is a sports event',
    },
    {
        label: 'Party',
        icon: party,
        description: 'This is a party event',
    },
    {
        label: 'Music',
        icon: music,
        description: 'This is a music event',
    },
    {
        label: 'Social',
        icon: social,
        description: 'This is a social event',
    },
    {
        label: 'Culture',
        icon: culture,
        description: 'This is a cultural event',
    },

]