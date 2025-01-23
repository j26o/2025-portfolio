import { withPayload } from "@payloadcms/next/withPayload";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ['three'],
};

export default withPayload(nextConfig);
