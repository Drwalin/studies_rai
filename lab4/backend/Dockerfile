FROM mcr.microsoft.com/dotnet/runtime:6.0 AS base
WORKDIR /app

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["lab4-backend.csproj", "./"]
RUN dotnet restore "lab4-backend.csproj"
COPY . .
WORKDIR "/src/"
RUN dotnet build "lab4-backend.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "lab4-backend.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "lab4-backend.dll"]
