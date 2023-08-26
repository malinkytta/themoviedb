import { useIsFetching } from "@tanstack/react-query"
import { SyncLoader } from "react-spinners"

const GlobalLoadingSpinner = () => {
    const isFetching = useIsFetching()

    return isFetching ? (
        <div id="global-loading-spinner-wrapper">
            <SyncLoader speedMultiplier={1.5} />
        </div>
    ) : null
}

export default GlobalLoadingSpinner