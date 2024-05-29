ARG UBUNTU_VERSION=22.04

FROM riscv64/ubuntu:$UBUNTU_VERSION as build

RUN apt-get update && \
    apt-get install -y build-essential git

WORKDIR /app

COPY ./llama.cpp ./llama.cpp

WORKDIR /app/llama.cpp

RUN make -j$(nproc)  main

FROM riscv64/ubuntu:$UBUNTU_VERSION as runtime


LABEL io.cartesi.rollups.sdk_version=0.6.0
LABEL io.cartesi.rollups.ram_size=1024Mi

ARG DEBIAN_FRONTEND=noninteractive
RUN <<EOF
set -e
apt-get update
apt-get install -y --no-install-recommends \
  busybox-static=1:1.30.1-7ubuntu3
rm -rf /var/lib/apt/lists/* /var/log/* /var/cache/*
useradd --create-home --user-group dapp
EOF

ARG MACHINE_EMULATOR_TOOLS_VERSION=0.14.1
ADD https://github.com/cartesi/machine-emulator-tools/releases/download/v${MACHINE_EMULATOR_TOOLS_VERSION}/machine-emulator-tools-v${MACHINE_EMULATOR_TOOLS_VERSION}.deb /
RUN dpkg -i /machine-emulator-tools-v${MACHINE_EMULATOR_TOOLS_VERSION}.deb \
  && rm /machine-emulator-tools-v${MACHINE_EMULATOR_TOOLS_VERSION}.deb


COPY ./Phi-3-mini-4k-instruct-q4.gguf /Phi-3-mini-4k-instruct-q4.gguf

COPY --from=build /app/llama.cpp/main /main

ENV LC_ALL=C.utf8
ENV PATH="/opt/cartesi/bin:${PATH}"
WORKDIR /opt/cartesi/dapp
RUN mkdir -p /opt/cartesi/dapp

ENV ROLLUP_HTTP_SERVER_URL="http://127.0.0.1:5004"

ENTRYPOINT ["rollup-init"]
CMD ["/main", "-m", "/Phi-3-mini-4k-instruct-q4.gguf", "--prompt", "Once"]
