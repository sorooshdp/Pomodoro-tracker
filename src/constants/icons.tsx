import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded"
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded"
import PauseRoundedIcon from "@mui/icons-material/PauseRounded"
import SkipNextRoundedIcon from "@mui/icons-material/SkipNextRounded"
import ArrowLeftRoundedIcon from "@mui/icons-material/ArrowLeftRounded"
import ArrowRightRoundedIcon from "@mui/icons-material/ArrowRightRounded"
import AddRoundedIcon from "@mui/icons-material/AddRounded"
import {
    DeleteOutlineRounded,
    ModeEditOutlineRounded,
} from "@mui/icons-material"

export const icons = {
    MoreHorizRoundedIcon: (
        <MoreHorizRoundedIcon className="center" style={{ fontSize: "40px" }} />
    ),
    PauseRoundedIcon: (
        <PauseRoundedIcon
            className="center transition-colors"
            style={{ fontSize: "60px" }}
        />
    ),
    PlayArrowRoundedIcon: (
        <PlayArrowRoundedIcon
            className="center transition-colors"
            style={{ fontSize: "60px" }}
        />
    ),
    SkipNextRoundedIcon: (
        <SkipNextRoundedIcon className="center" style={{ fontSize: "40px" }} />
    ),
    ArrowLeftRoundedIcon: <ArrowLeftRoundedIcon style={{ fontSize: "40px" }} />,
    ArrowRightRoundedIcon: (
        <ArrowRightRoundedIcon
            className="opacity-0 hover:opacity-100 cursor-pointer"
            style={{
                fontSize: "80px",
                transition: "opacity 0.5s ease, transform 0.3s ease",
            }}
        />
    ),
    AddRoundedIcon: (
        <AddRoundedIcon style={{ fontSize: "32px" }} />
    ),
    DeleteOutlineRounded: <DeleteOutlineRounded style={{ fontSize: "25px" }} />,
    ModeEditOutlineRounded: (
        <ModeEditOutlineRounded style={{ fontSize: "25px" }} />
    ),
}
