import { SplineScene } from "./spline";
import { Spotlight } from "./spotlight";

export function Robot() {
  return (
    <>
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="white"
      />


      <div className="relative h-screen w-screen">
        {/* Note: In some environments, the spline scene URL might need to be whitelisted or valid CORS wise */}
        <SplineScene
          scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
          className="w-full h-full"
        />
      </div>
    </>
  )
}