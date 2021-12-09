import React from 'react'

function Overview() {
<<<<<<< Updated upstream
=======
  const [trips, setTrips] = useState(null);
  const abort = useRef(new AbortController());

  const searchRef = useRef();

  // sorts
  const [titleDescOrder, setTitleDescOrder] = useState(false);
  const [dateDescOrder, setDateDescOrder] = useState(true);

  function sortTrips(type) {
    const tripsCopy = [...trips];

    switch (type) {
      case "title":
        tripsCopy.sort((tripA, tripB) => {
          if (tripA.title < tripB.title) {
            return titleDescOrder ? -1 : 1;
          }
          if (tripA.title > tripB.title) {
            return titleDescOrder ? 1 : -1;
          }

          return 0;
        })

        setTitleDescOrder(prevState => !prevState);

        break;
      case "date":

        tripsCopy.sort((tripA, tripB) => {
          if (tripA.lastAccessed < tripB.lastAccessed) {
            return dateDescOrder ? 1 : -1;
          }

          if (tripA.lastAccessed > tripB.lastAccessed) {
            return dateDescOrder ? -1 : 1;
          }

          return 0;
        })

        setDateDescOrder(prevState => !prevState);

        break;
      default:
        break;
    }

    setTrips(tripsCopy);
  }

  function fetchTrips() {

  }

  function mapSearchResultsToElem() {

  }

  useEffect(() => {

    loadSampleTrip(abort.current, true)
    .then((trips) => {
      setTrips(trips);
    })
    .catch((e) => console.log(e));

    return () => {
      abort.current.abort();
    }
  }, []);

  if (trips === null) {
    return (
      <p>Loading...</p>
    )
  }

>>>>>>> Stashed changes
  return (
    <div>
      Overview.
    </div>
  )
}

export default Overview
