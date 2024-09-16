'use client'
import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Spinner } from '@/components/ui/spinner';
import { useGetUserCourses } from '@/queries/useGetUserCourses';

const Dashboard = () => {
  const { data: courses, isLoading } = useGetUserCourses();
  return (
    <div className="flex h-full w-full flex-col px-10 py-5">
      <h1 className="text-3xl font-bold text-gray-500">Дэшборд</h1>
      <div className="mt-10 flex flex-col gap-7">
        <p className="text-2xl font-semibold text-gray-700">Мои курсы</p>
        {isLoading ? (
          <Spinner />
        ) : courses?.length ? (
          <Carousel
            opts={{
              align: 'start',
            }}
            className="mx-auto w-full max-w-7xl"
          >
            <CarouselContent></CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        ) : (
          <p>У вас нет курсов, которые вы проходите в данное время</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
